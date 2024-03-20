import React, { useState } from "react";
import {
  selectModuleContent,
  selectCourseContent,
  setModulesScreen,
  setCourseContent,
} from "../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import NavigationButtons from "../genericComponents/NavigationButtons";
import CourseContent from "./CourseContent";

const ModuleContent = () => {
  const moduleContent = useSelector(selectModuleContent);
  const courseContent = useSelector(selectCourseContent);
  const dispatch = useDispatch();
  const [state, setState] = useState();
  const { modules } = moduleContent;

  const styles = {
    width: "15rem",
    height: "5rem",
  };

  const onBackClick = () => {
    // !need to address this
  };

  const onNextClick = () => {
    dispatch(setModulesScreen(1));
  };

  const onModuleClick = (item) => {
    setState(item.content);
    dispatch(setCourseContent(item.content));
  };

  return (
    <>
      <div className=" w-100 m-2 p-2 ">
        {!courseContent &&
          modules.map((item) => {
            return (
              <div
                className="card"
                style={styles}
                key={item.id}
                onClick={() => onModuleClick(item)}
              >
                {item.title}
              </div>
            );
          })}
      </div>
      {/* {state && <p>{state}</p>} */}
      {courseContent && <CourseContent />}
    </>
  );
};

export default ModuleContent;
