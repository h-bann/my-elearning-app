import React from "react";
import {
  selectModuleContent,
  selectCourseContent,
  setModulesScreen,
  setCourseContent,
} from "../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import NavigationButtons from "../genericComponents/NavigationButtons";
import CourseContent from "./CourseContent";
import { compose } from "@reduxjs/toolkit";

const ModuleContent = () => {
  const moduleContent = useSelector(selectModuleContent);
  const courseContent = useSelector(selectCourseContent);
  const dispatch = useDispatch();
  const { modules } = moduleContent;

  const onBackClick = () => {
    // !need to address this
  };

  const onNextClick = () => {
    dispatch(setModulesScreen(1));
  };

  const onModuleClick = (id) => {
    const dataCopy = [...modules];
    const filteredContent = dataCopy.find((item) => item.id === id);
    if (filteredContent) {
      const { content } = filteredContent;
      dispatch(setCourseContent(content));
    }
  };

  return (
    <>
      <div className="courseContainer">
        <div>
          <NavigationButtons
            className="button"
            onNextClick={onNextClick}
            onBackClick={onBackClick}
            nextText="Next"
            backText="Back"
          />
        </div>
        {!courseContent &&
          modules.map((item) => {
            return (
              <h6 key={item.id} onClick={() => onModuleClick(item.id)}>
                {item.title}
              </h6>
            );
          })}
      </div>
      {courseContent && <CourseContent />}
    </>
  );
};

export default ModuleContent;
