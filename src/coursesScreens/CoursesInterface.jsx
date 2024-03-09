import React from "react";
import data from "../courseContent.json";
import { setCoursesScreen, setModulesScreen } from "../redux/coursesSlice";
import { useDispatch } from "react-redux";

const CoursesInterface = () => {
  const dispatch = useDispatch();

  return (
    <>
      {data.map((item) => {
        return (
          <h4
            key={item.id}
            onClick={() => {
              dispatch(setCoursesScreen(item.id));
              dispatch(setModulesScreen(0));
            }}
          >
            {item.title}
          </h4>
        );
      })}
    </>
  );
};

export default CoursesInterface;
