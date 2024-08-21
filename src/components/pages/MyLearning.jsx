import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModuleContent,
  setModuleContent,
  setEnrolledCourses,
  selectEnrolledCourses,
  setModuleProgress,
  setActiveCourse,
} from "../../redux/coursesSlice";
import Button from "../genericComponents/Button";
import ModuleContent from "../ModuleContent/ModuleContent";
import axios from "axios";
import { getFromLocal } from "../../storage";
import { url } from "../../config";
import "../pages/courses.scss";
import { greenTick } from "../../utils/svgs";

const MyLearning = () => {
  const dispatch = useDispatch();
  const [infoState, setInfoState] = useState();
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleContent = useSelector(selectModuleContent);

  const getEnrolledCourses = async () => {
    const { data } = await axios.get(`${url}/courses/getEnrolledCourses`, {
      headers: { token: getFromLocal("token") },
    });
    dispatch(setEnrolledCourses(data.enrolledCourses));
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const onCourseClick = async (item) => {
    dispatch(setModuleContent(true));
    dispatch(setActiveCourse(item.course_id));
  };

  const leaveCourse = async (item) => {
    dispatch(setModuleProgress([]));
    const { data } = await axios.delete(`${url}/courses/deleteEnrolled`, {
      headers: { token: getFromLocal("token"), id: item.course_id },
    });
    console.log(data);
    getEnrolledCourses();
  };

  if (!enrolledCourses || !enrolledCourses.length) {
    return (
      <div className="w-100 m-auto">
        <h3 className="m-4">Enrolled Courses</h3>
        <p className="m-4">You haven't enrolled on any courses yet.</p>
      </div>
    );
  }

  return (
    <>
      {!moduleContent && (
        <div className="main-container">
          <h3 className="">Enrolled Courses</h3>
          <div className="card-container">
            {enrolledCourses.map((item) => {
              return (
                <div className="card course-card" key={item.course_id}>
                  <img src={"./images/" + item.image} />
                  <div className="card-body">
                    <div>
                      <h4 className="card-title">{item.course_title}</h4>
                      <div>
                        {item.course_status === "complete" && greenTick}
                      </div>
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
                    <Button
                      className={["btn-outline-primary", ""]}
                      text="More Info"
                      onClick={() => setInfoState(item)}
                    />
                    {infoState && infoState.course_id === item.course_id && (
                      <div className="card-text text-wrap">
                        {infoState.more_info}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {moduleContent && <div> {<ModuleContent />}</div>}
      {/* {moduleContent !== null && isStateReady && (
        <div> {<ModuleContent moduleId={state} />}</div>
      )} */}
    </>
  );
};

export default MyLearning;
