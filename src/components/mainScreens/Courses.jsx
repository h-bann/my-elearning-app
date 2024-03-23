import React, { useState } from "react";
import {
  selectModuleContent,
  selectMoreInfoContent,
  setModuleContent,
  setCoursesScreen,
  setModulesScreen,
  setMoreInfoContent,
  setCourseContent,
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

  const onCourseClick = (item) => {
    dispatch(setModuleContent(item));
    dispatch(setCourseContent(item.modules[0]));
  };

  return (
    <>
      {!moduleContent && (
        <div className="d-flex flex-wrap justify-content-start m-4 ">
          {data.map((item) => {
            return (
              <div className="card m-2" style={styles} key={item.id}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="220"
                  height="220"
                  fill="currentColor"
                  class="bi bi-pentagon"
                  viewBox="-3 -2 20 20"
                >
                  <path d="M7.685 1.545a.5.5 0 0 1 .63 0l6.263 5.088a.5.5 0 0 1 .161.539l-2.362 7.479a.5.5 0 0 1-.476.349H4.099a.5.5 0 0 1-.476-.35L1.26 7.173a.5.5 0 0 1 .161-.54l6.263-5.087Zm8.213 5.28a.5.5 0 0 0-.162-.54L8.316.257a.5.5 0 0 0-.631 0L.264 6.286a.5.5 0 0 0-.162.538l2.788 8.827a.5.5 0 0 0 .476.349h9.268a.5.5 0 0 0 .476-.35l2.788-8.826Z" />
                </svg>
                <div className="card-body">
                  <h4 className="card-title">{item.title}</h4>
                  <Button
                    className="btn btn-primary me-2 my-2"
                    text="Enrol"
                    onClick={() => onCourseClick(item)}
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
                </div>
              </div>
            );
          })}
        </div>
      )}

      {moduleContent !== null && <div> {<ModuleContent />}</div>}

      {/* // ! MAKE A NEW COMPONENT WHICH HAS IT'S OWN LOGIC ETC */}
    </>
  );
};

export default Courses;
