import React, { useState } from "react";
import {
  selectModuleContent,
  selectCourseContent,
  setModulesScreen,
  setCourseContent,
} from "../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import NavigationButtons from "../genericComponents/NavigationButtons";
import CourseContent from "./CourseContent";

const ModuleContent = () => {
  const moduleContent = useSelector(selectModuleContent);
  const courseContent = useSelector(selectCourseContent);
  const dispatch = useDispatch();
  const [state, setState] = useState();
  const { modules } = moduleContent;

  const styles = {
    width: "15rem",
    height: "5rem",
  };

  const onBackClick = () => {
    // !need to address this
  };

  const onNextClick = () => {
    dispatch(setModulesScreen(1));
  };

  const onModuleClick = (item) => {
    dispatch(setCourseContent(item));
  };

  return (
    <div className="row">
      <div className="col-3">
        {modules.map((item) => {
          return (
            <div
              className="card mb-3 d-flex justify-content-center align-items-center"
              style={styles}
              key={item.id}
              onClick={() => onModuleClick(item)}
            >
              {item.moduleTitle}
            </div>
          );
        })}
        {/* {state && <p>{state}</p>} */}
      </div>
      <div className="col-9">{courseContent && <CourseContent />}</div>
    </div>
  );
};

export default ModuleContent;
