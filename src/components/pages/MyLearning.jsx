import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEnrolledCourses,
  selectEnrolledCourses,
  setModuleProgress,
  setProgressBar,
  selectProgressBar,
} from "../../redux/coursesSlice";
import Button from "../genericComponents/Button";
import axios from "axios";
import { getFromLocal } from "../../storage";
import { url } from "../../config";
import { useNavigate } from "react-router-dom";
import "../pages/courses.scss";

const MyLearning = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const progressBar = useSelector(selectProgressBar);
  const navigate = useNavigate();

  const getEnrolledCourses = async () => {
    const { data } = await axios.get(`${url}/courses/getEnrolledCourses`, {
      headers: { token: getFromLocal("token") },
    });
    dispatch(setEnrolledCourses(data.enrolledCourses));
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const getModuleProgress = async () => {
    const { data: progressBar } = await axios.get(
      `${url}/courses/progressBar`,
      {
        headers: { token: getFromLocal("token") },
      }
    );
    if (progressBar.code) {
      dispatch(setProgressBar(progressBar.message));
    }
  };

  useEffect(() => {
    getModuleProgress();
  }, []);

  const progressBarFunction = (item) => {
    const progress = progressBar.find(
      (progress) => progress.course_id === item.course_id
    );
    if (progress) {
      return (progress.module_ids.length / item.modules.length) * 100;
    }
    return 0;
  };

  const onCourseClick = async (item) => {
    dispatch(setEnrolledCourses(item));
    navigate("/content");
  };

  const leaveCourse = async (item) => {
    dispatch(setModuleProgress([]));
    const { data } = await axios.delete(`${url}/courses/deleteEnrolled`, {
      headers: { token: getFromLocal("token"), id: item.course_id },
    });
    console.log(data);
    getEnrolledCourses();
  };

  if (!enrolledCourses.length) {
    return (
      <div className="w-100 m-auto">
        <h3 className="m-4">Enrolled Courses</h3>
        <p className="m-4">You haven't enrolled on any courses yet.</p>
      </div>
    );
  }
  return (
    <>
      <div className="main-container">
        <h3 className="">Enrolled Courses</h3>
        <div className="card-container">
          {enrolledCourses.map((item) => {
            return (
              <div className="card course-card" key={item.course_id}>
                <img src={"./images/" + item.image} />
                <div className="card-body">
                  <div className="course-complete-container"></div>
                  <div>
                    <h4 className="card-title">{item.course_title}</h4>
                    {item.course_status && (
                      <h6 className="course-complete-symbol">Complete</h6>
                    )}
                    {!item.course_status && (
                      <progress
                        max="100"
                        value={progressBarFunction(item)}
                      ></progress>
                    )}
                    <div className="card-text text-wrap">{item.more_info}</div>
                  </div>
                  <Button
                    className={["btn-primary"]}
                    text="Continue"
                    onClick={() => onCourseClick(item)}
                  />
                  <Button
                    className={["btn-outline-primary", ""]}
                    text="Leave course"
                    onClick={() => leaveCourse(item)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyLearning;
