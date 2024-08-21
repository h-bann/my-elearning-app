import React, { useEffect, useState } from "react";
import {
  selectModuleContent,
  setModuleProgress,
  selectEnrolledCourses,
  selectModuleProgress,
  selectActiveCourse,
} from "../../redux/coursesSlice";
import { url } from "../../config";
import { getFromLocal } from "../../storage";
import { useDispatch, useSelector } from "react-redux";
import CourseContent from "./CourseContent";
import axios from "axios";
import usePageBottom from "../../utils/hooks";
import { greenTick, downArrow } from "../../utils/svgs";
import Button from "../genericComponents/Button";

const MobileView = ({ handleModuleClick }) => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleContent = useSelector(selectModuleContent);
  const moduleProgress = useSelector(selectModuleProgress);
  const activeCourse = useSelector(selectActiveCourse);
  const [hideContent, setHideContent] = useState(true);
  const [activeModule, setActiveModule] = useState();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  console.log(handleModuleClick);
  const handleClick = (item) => {
    handleModuleClick(item);
  };

  return (
    <div className="module-container">
      <div className="modules">
        {enrolledCourses.map((enrolledCoursesItem) => {
          const { modules } = enrolledCoursesItem;
          return (
            enrolledCoursesItem.course_id === activeCourse &&
            modules.map((modulesItem) => {
              const lastItem = modules.slice(-1);
              const { content } = modulesItem;
              return (
                <div className="individual-module" key={modulesItem.id}>
                  <div
                    className="module-tabs"
                    onClick={handleClick(modulesItem)}
                  >
                    <h1>{modulesItem.module_title}</h1>
                    <div className="module-tabs-svg">
                      <div key={modulesItem.id}>
                        {moduleProgress?.map((moduleId) => {
                          if (moduleId === modulesItem.id) {
                            return <span key={moduleId}>{greenTick}</span>;
                          }
                        })}
                      </div>
                      <div
                        className={`svg-container ${
                          hideContent && activeModule === modulesItem.id
                            ? "rotated"
                            : ""
                        }`}
                      >
                        {downArrow}
                      </div>
                    </div>
                  </div>
                  <div
                    key={modulesItem.id}
                    className={`content ${
                      hideContent && activeModule === modulesItem.id
                        ? "displayed"
                        : "hidden"
                    }`}
                  >
                    <CourseContent content={content} />
                    <div className="next-button">
                      <Button
                        className={["btn-primary"]}
                        text={
                          lastItem[0].id === modulesItem.id
                            ? "Finish Course"
                            : "Next Module"
                        }
                        onClick={() => onNextClick(modulesItem)}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          );
        })}
      </div>
    </div>
  );
};

export default MobileView;
