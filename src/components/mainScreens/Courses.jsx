import React from "react";
import {
  selectModuleContent,
  setModuleContent,
  setCoursesScreen,
  setModulesScreen,
} from "../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import ModuleContent from "../main/ModuleContent";
import data from "../../courseContent.json";

const Courses = () => {
  const moduleContent = useSelector(selectModuleContent);
  const dispatch = useDispatch();

  const onCourseClick = (id) => {
    // makes copy of the original data
    const dataCopy = [...data];
    dispatch(setCoursesScreen(id));
    dispatch(setModulesScreen(0));
    // looks in dataCopy for a id that matches the id (courseScreen)
    const filteredCourse = dataCopy.find((item) => item.id === id);
    // if it finds it
    if (filteredCourse) {
      const { modules } = filteredCourse;
      // update store with content
      dispatch(setModuleContent(filteredCourse));
    }
  };

  return (
    <>
      {!moduleContent &&
        data.map((item) => {
          return (
            <h4 key={item.id} onClick={() => onCourseClick(item.id)}>
              {item.title}
            </h4>
          );
        })}
      {moduleContent && <ModuleContent />}
    </>
  );
};

export default Courses;
