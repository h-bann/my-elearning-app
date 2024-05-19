import React, { useEffect, useState } from "react";
import {
  selectModuleContent,
  selectCourseContent,
  setCourseContent,
  setCourseProgress,
  selectEnrolledCourses,
  setEnrolledCourses,
  selectCourseProgress,
} from "../../redux/coursesSlice";
import { url } from "../../config";
import { clearLocal, getFromLocal } from "../../storage";

import { useDispatch, useSelector } from "react-redux";
import CourseContent from "./CourseContent";
import axios from "axios";

const ModuleContent = ({ moduleId }) => {
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleContent = useSelector(selectModuleContent);
  const courseContent = useSelector(selectCourseContent);
  const courseProgress = useSelector(selectCourseProgress);
  const dispatch = useDispatch();
  const [state, setState] = useState(moduleContent[0].id);

  const styles = {
    width: "15rem",
    // height: "5rem",
  };

  const getEnrolledCourses = async () => {
    const { data } = await axios.get(`${url}/courses/getEnrolledCourses`, {
      headers: { token: getFromLocal("token") },
    });
    dispatch(setEnrolledCourses(data.enrolledCourses));
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  useEffect(() => {
    if (enrolledCourses.length) {
      const index = enrolledCourses.find((item) => {
        return item.course_id === moduleContent[0].course_id;
      });
      if (index) {
        setState(index.course_progress);
      }
    }
  }, []);

  const onModuleClick = async (item) => {
    dispatch(setCourseContent(item.content));
    setState(item.id);
    const { data } = await axios.patch(
      `${url}/courses/courseProgress  `,
      { moduleId: item.id, courseId: item.course_id },
      {
        headers: { token: getFromLocal("token") },
      }
    );
  };

  if (!moduleContent || state === null) {
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
