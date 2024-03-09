import React from "react";
import { selectCoursesScreen } from "../../redux/coursesSlice";
import { useSelector } from "react-redux";
import BasicLifeSupport from "../../coursesScreens/BasicLifeSupport";
import HowToCook from "../../coursesScreens/HowToCook";
import CoursesInterface from "../../coursesScreens/CoursesInterface";

const Courses = () => {
  const coursesScreen = useSelector(selectCoursesScreen);

  return (
    <>
      {coursesScreen === 0 && <CoursesInterface />}
      {coursesScreen === 1 && <BasicLifeSupport />}
      {coursesScreen === 2 && <HowToCook />}
    </>
  );
};

export default Courses;
