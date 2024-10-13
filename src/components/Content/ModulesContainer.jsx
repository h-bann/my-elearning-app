import React, { useCallback, useEffect, useState } from "react";
import {
  setModuleProgress,
  selectEnrolledCourses,
  selectModuleProgress,
  selectActiveCourse,
} from "../../redux/coursesSlice";
import { url } from "../../config";
import { getFromLocal } from "../../storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ModuleTab from "./ModuleTab";
import Content from "./Content";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./modulesContainer.scss";

const ModulesContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleProgress = useSelector(selectModuleProgress);
  const activeCourse = useSelector(selectActiveCourse);
  const [hideContent, setHideContent] = useState(false);
  const [activeModule, setActiveModule] = useState();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const getModuleProgress = async () => {
      try {
        const { data: userModuleProgress } = await axios.get(
          `${url}/courses/userProgress`,
          {
            headers: {
              token: getFromLocal("token"),
              id: enrolledCourses[0].course_id,
            },
          }
        );
        if (userModuleProgress.code === 1) {
          dispatch(setModuleProgress(userModuleProgress.message.module_ids));
        }
      } catch (error) {
        console.error("Failed to fetch module progress", error);
      }
    };
    getModuleProgress();
  }, [activeCourse]);

  const handleModuleClick = useCallback((item) => {
    // make modules toggle correctly in mobile view
    setActiveModule((prev) => (prev === item.id ? null : item.id));
  }, []);

  const onNextClick = async (item) => {
    const lastItem = enrolledCourses[0].modules.slice(-1);
    if (lastItem[0].id !== item.id) {
      setActiveModule(item.id + 1);
    }
    dispatch(setModuleProgress(item.id));

    const { data } = await axios.patch(
      `${url}/courses/moduleProgress`,
      { moduleId: item.id, courseId: item.course_id },
      {
        headers: { token: getFromLocal("token") },
      }
    );
    console.log(data);

    if (lastItem[0].id === item.id) {
      toast.success("Well done, course completed! ");
      const { data: courseComplete } = await axios.patch(
        `${url}/courses/courseCompletion`,
        { courseId: item.course_id },
        { headers: { token: getFromLocal("token") } }
      );
      console.log(courseComplete);
    }
  };

  // when user clicks new module and state changes, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeModule]);

  // set component's innerWidth state to the width of the window as it is resized by user
  // ! NEED TO OPTIMISE THIS TO STOP COMPONENT RE-RENDER
  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  if (!enrolledCourses) {
    <p>Loading</p>;
  }

  const { modules } = enrolledCourses[0];
  const lastItem = modules?.slice(-1);

  // if window size less than 365 then render HTML option A
  if (innerWidth < 360) {
    return (
      <div className="main-container">
        <div className="modules-container-mobile">
          {modules?.map((modulesItem) => {
            return (
              <div className="module-card-mobile" key={modulesItem.id}>
                <ModuleTab
                  onModuleClick={handleModuleClick}
                  module={modulesItem}
                  moduleProgress={moduleProgress}
                  activeModule={activeModule}
                  isHidden={hideContent}
                />
                {activeModule === modulesItem.id && (
                  <Content
                    className={"content-mobile displayed"}
                    module={modulesItem}
                    lastItem={lastItem}
                    onNextClick={onNextClick}
                  />
                )}
              </div>
            );
          })}
        </div>
        <Toaster />;
      </div>
    );
  }

  return (
    <div className="main-container-desktop">
      <div className="modules-container-desktop">
        {modules?.map((modulesItem) => {
          return (
            <>
              <div key={modulesItem.id} className="module-card-desktop">
                <ModuleTab
                  onModuleClick={handleModuleClick}
                  module={modulesItem}
                  moduleProgress={moduleProgress}
                  activeModule={activeModule}
                  isHidden={hideContent}
                />
              </div>
            </>
          );
        })}
      </div>
      {modules?.map((contentItem) => {
        if (activeModule === contentItem.id) {
          return (
            <Content
              className={"content-desktop displayed"}
              module={contentItem}
              lastItem={lastItem}
              onNextClick={onNextClick}
            />
          );
        }
      })}
      <Toaster />
    </div>
  );
};

export default ModulesContainer;
