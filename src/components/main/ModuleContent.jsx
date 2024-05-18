import React, { useEffect, useState } from "react";
import {
  selectModuleContent,
  selectCourseContent,
  setCourseContent,
  setCourseProgress,
  selectEnrolledCourses,
  setEnrolledCourses,
} from "../../redux/coursesSlice";
import { url } from "../../config";
import { clearLocal, getFromLocal } from "../../storage";

import { useDispatch, useSelector } from "react-redux";
import CourseContent from "./CourseContent";
import axios from "axios";

const ModuleContent = () => {
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleContent = useSelector(selectModuleContent);
  const courseContent = useSelector(selectCourseContent);
  const dispatch = useDispatch();
  const [state, setState] = useState(moduleContent[0].id);

  // const getEnrolledCourses = async () => {
  //   const { data } = await axios.get(`${url}/courses/getEnrolledCourses`, {
  //     headers: { token: getFromLocal("token") },
  //   });
  //   dispatch(setEnrolledCourses(data.enrolledCourses));
  // };

  // useEffect(() => {
  //   getEnrolledCourses();
  // }, [moduleContent]);
  // console.log(enrolledCourses);
  useEffect(() => {
    if (enrolledCourses.length) {
      const index = enrolledCourses.find((item) => {
        console.log(item.course_id);
        return item.course_id === moduleContent[0].course_id;
      });
      console.log(moduleContent[0].course_id);
      console.log(enrolledCourses);
      setState(index.course_progress);
    }
  }, []);

  const styles = {
    width: "15rem",
    // height: "5rem",
  };

  const onModuleClick = async (item) => {
    dispatch(setCourseContent(item.content));
    dispatch(setCourseProgress(item.id));
    setState(item.id);
    const { data } = await axios.patch(
      `${url}/courses/courseProgress  `,
      { moduleId: item.id, courseId: item.course_id },
      {
        headers: { token: getFromLocal("token") },
      }
    );
  };

  if (!moduleContent) {
    <p>Loading</p>;
  }
  return (
    <div className="row d-flex flex-nowrap">
      <div className="modules">
        {moduleContent.map((item) => {
          return (
            <div
              className={`module-card d-flex p-1 align-items-center ${
                state === item.id && "selected"
              }`}
              style={styles}
              key={item.id}
              onClick={() => onModuleClick(item)}
            >
              {item.module_title}
            </div>
          );
        })}
      </div>
      <div className="content">{courseContent && <CourseContent />}</div>
    </div>
  );
};

export default ModuleContent;
