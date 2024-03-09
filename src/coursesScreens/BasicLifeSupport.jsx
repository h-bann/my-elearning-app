import React from "react";
import { selectModulesScreen, selectRenderStatus } from "../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setCoursesScreen,
  setModulesScreen,
  setRenderStatus,
} from "../redux/coursesSlice";
import data from "../courseContent.json";
import NavigationButtons from "../components/genericComponents/NavigationButtons";
import Module from "../components/main/Module";

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
        {modulesScreen === 0 &&
          data[0].modules.map((item) => {
            return (
              <h6
                key={item.id}
                onClick={() => {
                  dispatch(setModulesScreen(item.id));
                }}
              >
                {item.title}
              </h6>
            );
          })}
        <div>
          {modulesScreen === 1 && <Module />}
          {modulesScreen === 2 && <Module />}
          {modulesScreen === 3 && <Module />}
          {modulesScreen === 4 && <Module />}
          {modulesScreen === 5 && <Module />}
        </div>
      </div>
    </>
  );
};

export default BasicLifeSupport;
