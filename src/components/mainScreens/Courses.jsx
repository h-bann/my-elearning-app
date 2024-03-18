import React from "react";
import {
  selectModuleContent,
  selectMoreInfoContent,
  setModuleContent,
  setCoursesScreen,
  setModulesScreen,
  setMoreInfoContent,
} from "../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import ModuleContent from "../main/ModuleContent";
import data from "../../courseContent.json";
import Button from "../genericComponents/Button";

const Courses = () => {
  const moduleContent = useSelector(selectModuleContent);
  const moreInfo = useSelector(selectMoreInfoContent);
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

  const onInfoClick = (id) => {
    const dataCopy = [...data];
    const moreInfo = dataCopy.filter((item) => {
      return item.id === id;
    });
    const { moreInformation } = moreInfo[0];
    dispatch(setMoreInfoContent(moreInformation));
  };

  return (
    <>
      {!moduleContent &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <h4>{item.title}</h4>
              <Button
                className="btn btn-outline-primary"
                text="Enrol"
                onClick={() => onCourseClick(item.id)}
              />
              <Button
                className="btn btn-outline-primary"
                text="More Info"
                onClick={() => onInfoClick(item.id)}
              />
            </div>
          );
        })}
      {moduleContent && <ModuleContent />}
      {/* // ! MAKE A NEW COMPONENT WHICH HAS IT'S OWN LOGIC ETC */}
      {moreInfo && <p>{moreInfo}</p>}
    </>
  );
};

export default Courses;
