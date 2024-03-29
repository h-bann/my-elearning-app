import React, { useState } from "react";
import {
  selectModuleContent,
  setModuleContent,
  setCourseContent,
  setMyLearning,
} from "../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import ModuleContent from "../main/ModuleContent";
import data from "../../courseContent.json";
import Button from "../genericComponents/Button";

const Courses = () => {
  const [infoState, setInfoState] = useState();
  const moduleContent = useSelector(selectModuleContent);
  const dispatch = useDispatch();

  const styles = { width: "15rem" };

  const onCourseClick = (item) => {
    dispatch(setModuleContent(item));
    dispatch(setCourseContent(item.modules[0]));
    dispatch(setMyLearning(item));
  };

  return (
    <>
      {!moduleContent && (
        <div className="w-100 m-auto ">
          <h3 className="m-4">Available Courses</h3>
          <div className="w-100 d-flex flex-wrap justify-content-start m-4 ">
            {data.map((item) => {
              return (
                <div
                  className="card m-2 course-card"
                  style={styles}
                  key={item.id}
                >
                  <img src={"../../../public/images/" + item.image} />
                  <div className="card-body">
                    <h4 className="card-title">{item.title}</h4>
                    <Button
                      className={["btn-primary", "me-2", "my-2"]}
                      text="Enrol"
                      onClick={() => onCourseClick(item)}
                    />
                    <Button
                      className={["btn-outline-primary", ""]}
                      text="More Info"
                      onClick={() => setInfoState(item)}
                      π
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
        </div>
      )}

      {moduleContent !== null && <div> {<ModuleContent />}</div>}
    </>
  );
};

export default Courses;
