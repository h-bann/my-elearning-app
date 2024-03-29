import React from "react";
import { useSelector } from "react-redux";
import {
  seclectMyLearning,
  selectModuleContent,
  setModuleContent,
  setCourseContent,
} from "../../redux/coursesSlice";
import Button from "../genericComponents/Button";
import ModuleContent from "../main/ModuleContent";

const MyLearning = () => {
  const myLearning = useSelector(seclectMyLearning);
  const moduleContent = useSelector(selectModuleContent);
  const styles = { width: "15rem" };

  const onCourseClick = (item) => {
    dispatch(setModuleContent(item));
    dispatch(setCourseContent(item.modules[0]));
  };

  return (
    <>
      {myLearning && (
        <div className="w-100 m-auto ">
          <h3 className="m-4">Enrolled Courses</h3>
          <div className="w-100 d-flex flex-wrap justify-content-start m-4 ">
            {myLearning.map((item) => {
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
                      text="Start"
                      onClick={() => onCourseClick(item)}
                    />
                    {/* <Button
                      className={["btn-outline-primary", ""]}
                      text="More Info"
                      onClick={() => setInfoState(item)}
                      π
                    /> */}
                    {/* {infoState && infoState.id === item.id && (
                      <div className="card-text text-wrap">
                        {infoState.moreInformation}
                      </div>
                    )} */}
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

export default MyLearning;
