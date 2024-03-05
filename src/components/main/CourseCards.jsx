import React from "react";
import data from "../../courseContent.json";
import { useDispatch, useSelector } from "react-redux";
import { selectCoursesScreen } from "../../redux/coursesSlice";
import { setCoursesScreen, setRenderStatus } from "../../redux/coursesSlice";
import SessionOverview from "../../coursesScreens/basicLifeSupport/SessionOverview";

const CourseCards = () => {
  const dispatch = useDispatch(0);
  const screen = useSelector(selectCoursesScreen);
  const { cardText } = data[0];

  return (
    <>
      {cardText.map((item, index) => (
        <h6
          key={index}
          className="card"
          onClick={() => {
            dispatch(setCoursesScreen(index + 1));
            dispatch(setRenderStatus(false));
          }}
        >
          {item}
        </h6>
      ))}
      {screen === 1 && <SessionOverview />}
    </>
  );
};

export default CourseCards;
