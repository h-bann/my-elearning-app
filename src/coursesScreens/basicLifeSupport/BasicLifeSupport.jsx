import React from "react";
import {
  selectCoursesScreen,
  selectModulesScreen,
  selectRenderStatus,
} from "../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setCoursesScreen,
  setModulesScreen,
  setRenderStatus,
} from "../../redux/coursesSlice";
import Button from "../../components/genericComponents/Button";
import data from "../../courseContent.json";
import CourseContent from "../CourseContent";
import NavigationButtons from "../../components/genericComponents/NavigationButtons";

const BasicLifeSupport = () => {
  const modulesScreen = useSelector(selectModulesScreen);
  const renderStatus = useSelector(selectRenderStatus);
  const dispatch = useDispatch();

  const onBackClick = () => {
    dispatch(setCoursesScreen(0));
    dispatch(setRenderStatus(true));
  };

  const onNextClick = () => {
    dispatch(setModulesScreen(1));
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
        <CourseContent />
      </div>
    </>
  );
};

export default BasicLifeSupport;
