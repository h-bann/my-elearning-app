import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModuleContent,
  setCourses,
  setModuleContent,
  setCourseContent,
  setEnrolledCourses,
  selectEnrolledCourses,
  selectCourses,
  selectCourseContent,
} from "../../redux/coursesSlice";
import Button from "../genericComponents/Button";
import ModuleContent from "../main/ModuleContent";
import axios from "axios";
import { getFromLocal } from "../../storage";
import { url } from "../../config";
import { selectLoginState } from "../../redux/accountSlice";
import "../pages/courses.scss";

const MyLearning = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleContent = useSelector(selectModuleContent);
  const loginState = useSelector(selectLoginState);
  const [state, setState] = useState();
  const [isStateReady, setIsStateReady] = useState(false);

  const getEnrolledCourses = async () => {
    const { data } = await axios.get(`${url}/courses/getEnrolledCourses`, {
      headers: { token: getFromLocal("token") },
    });
    dispatch(setEnrolledCourses(data.enrolledCourses));
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [moduleContent]);

  const onCourseClick = async (item) => {
    if (loginState) {
      // get's modules and content from database
      const { data: courseContent } = await axios.get(
        `${url}/courses/getCourse/${item.course_id}`,
        {
          headers: { token: getFromLocal("token") },
        }
      );
      // look through enrolledCourses to find one that user clicked
      const course = enrolledCourses.find((courses) => {
        return courses.course_id === courseContent.course.courseId;
      });

      if (course) {
        dispatch(setModuleContent(courseContent.course.modules));
        const content = courseContent.course.modules.find((module) => {
          // find the index that matches the course progress of user
          return module.id === course.course_progress;
        });
        setState(content.id);
        setIsStateReady(true);
        // set course content to match user course progress
        dispatch(setCourseContent(content.content));
      }
    }
  };

  const leaveCourse = async (item) => {
    await axios.delete(`${url}/courses/deleteEnrolled`, {
      headers: { token: getFromLocal("token"), id: item.course_id },
    });
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
                <div className="card course-card" key={item.id}>
                  <img src={"./images/" + item.image} />
                  <div className="card-body">
                    <h4 className="card-title">{item.course_title}</h4>
                    <Button
                      className={["btn-primary"]}
                      text="Continue"
                      onClick={() => onCourseClick(item)}
                    />
                    <Button
                      className={["btn-outline-primary", ""]}
                      text="Leave course"
                      onClick={() => leaveCourse(item)}
                      π
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {moduleContent !== null && isStateReady && (
        <div> {<ModuleContent moduleId={state} />}</div>
      )}
    </>
  );
};

export default MyLearning;
