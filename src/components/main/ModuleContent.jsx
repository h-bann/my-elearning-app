import React, { useState } from "react";
import {
  selectModuleContent,
  selectCourseContent,
  setCourseContent,
} from "../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import CourseContent from "./CourseContent";

const ModuleContent = () => {
  const moduleContent = useSelector(selectModuleContent);
  const courseContent = useSelector(selectCourseContent);
  const dispatch = useDispatch();
  const [state, setState] = useState(1);

  const styles = {
    width: "15rem",
    // height: "5rem",
  };

  const onModuleClick = (item) => {
    dispatch(setCourseContent(item.content));
    setState(item.id);
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
