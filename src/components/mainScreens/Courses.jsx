import React, { useState } from "react";
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
import image from "../../assets/01d.png";

const Courses = () => {
  const [infoState, setInfoState] = useState();
  const moduleContent = useSelector(selectModuleContent);
  const dispatch = useDispatch();

  const styles = { width: "15rem" };

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
      <div className={!moduleContent ? "d-flex" : null}>
        {!moduleContent &&
          data.map((item) => {
            return (
              <div className="card m-2" style={styles} key={item.id}>
                <img src={image} className="card-img-top" />
                <div className="card-body">
                  <h4 className="card-title">{item.title}</h4>
                  <Button
                    className="btn btn-primary me-2 my-2"
                    text="Enrol"
                    onClick={() => onCourseClick(item.id)}
                  />
                  <Button
                    className="btn btn-outline-primary"
                    text="More Info"
                    onClick={() => setInfoState(item)}
                  />
                  {infoState && infoState.id === item.id && (
                    <div className="card-text text-wrap">
                      {infoState.moreInformation}
                    </div>
                  )}
                  {/* {moreInfo && (
                  <div className="card-text text-wrap">{moreInfo}</div>
                )} */}
                </div>
              </div>
            );
          })}
        <div> {moduleContent && <ModuleContent />}</div>
        {/* // ! MAKE A NEW COMPONENT WHICH HAS IT'S OWN LOGIC ETC */}
      </div>
    </>
  );
};

export default Courses;
