import React from "react";
import {
  selectContentScreen,
  selectCoursesScreen,
  selectModulesScreen,
} from "../../redux/coursesSlice";
import data from "../../courseContent.json";
import { useSelector } from "react-redux";
import Module from "./Module";

const CourseContent = () => {
  const coursesScreen = useSelector(selectCoursesScreen);
  const modulesScreen = useSelector(selectModulesScreen);
  const contentScreen = useSelector(selectContentScreen);

  return <>{coursesScreen === 1 && modulesScreen === 1 && <Module />}</>;
};

export default CourseContent;
