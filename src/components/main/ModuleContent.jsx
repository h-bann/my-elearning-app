import React, { useState } from "react";
import {
  selectModuleContent,
  selectCourseContent,
  setCourseContent,
  setCourseProgress,
  selectEnrolledCourses,
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

  const activeModuleState = enrolledCourses.find((item) => {
    return item.course_id === moduleContent[0].course_id;
  });
  const [state, setState] = useState(activeModuleState.course_progress);

  const styles = {
    width: "15rem",
    // height: "5rem",
  };

  const onModuleClick = async (item) => {
    dispatch(setCourseContent(item.content));
    dispatch(setCourseProgress(item.id));
    setState(item.id);
    const { datas } = await axios.patch(
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
