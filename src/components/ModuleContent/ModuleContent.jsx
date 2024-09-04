import React, { useCallback, useEffect, useState } from "react";
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
import ModuleTab from "./ModuleTab";
import Content from "./Content";

const ModuleContent = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleContent = useSelector(selectModuleContent);
  const moduleProgress = useSelector(selectModuleProgress);
  const activeCourse = useSelector(selectActiveCourse);
  const [hideContent, setHideContent] = useState(false);
  const [activeModule, setActiveModule] = useState();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const getEnrolledCourses = async () => {
      try {
        const { data: userModuleProgress } = await axios.get(
          `${url}/courses/userProgress`,
          {
            headers: { token: getFromLocal("token"), id: activeCourse },
          }
        );
        if (userModuleProgress.code === 1) {
          dispatch(setModuleProgress(userModuleProgress.message.module_ids));
        }
      } catch (error) {
        console.error("Failed to fetch module progress", error);
      }
    };
    getEnrolledCourses();
  }, [activeCourse]);

  const handleModuleClick = useCallback((item) => {
    // make modules toggle correctly in mobile view
    setActiveModule((prev) => (prev === item.id ? null : item.id));
  }, []);

  const onNextClick = async (item) => {
    setActiveModule(item.id + 1);
    dispatch(setModuleProgress(item.id));

    const { data } = await axios.patch(
      `${url}/courses/moduleProgress`,
      { moduleId: item.id, courseId: item.course_id },
      {
        headers: { token: getFromLocal("token") },
      }
    );
    console.log(data);

    const activeCourse = enrolledCourses.find((foundItem) => {
      return foundItem.course_id === item.course_id;
    });
    const lastItem = activeCourse.modules.slice(-1);
    if (lastItem[0].id === item.id) {
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

  // if window size less than 365 then render HTML option A
  if (innerWidth < 365) {
    return (
      <div className="module-container">
        <div className="modules">
          {enrolledCourses.map((enrolledCoursesItem) => {
            const { modules } = enrolledCoursesItem;
            return (
              enrolledCoursesItem.course_id === activeCourse &&
              modules.map((modulesItem) => {
                const lastItem = modules.slice(-1);
                return (
                  <div className="individual-module" key={modulesItem.id}>
                    <ModuleTab
                      onModuleClick={handleModuleClick}
                      module={modulesItem}
                      moduleProgress={moduleProgress}
                      activeModule={activeModule}
                      isHidden={hideContent}
                    />
                    {activeModule === modulesItem.id && (
                      <Content
                        module={modulesItem}
                        lastItem={lastItem}
                        onNextClick={onNextClick}
                      />
                    )}
                  </div>
                );
              })
            );
          })}
        </div>
      </div>
    );
  }

  // otherwise, render HTML option B
  return (
    <div className="module-container">
      <div className="modules">
        {moduleContent.map((item) => {
          return (
            <>
              <div
                className={`individual-module ${
                  moduleProgress === item.id && "selected"
                }`}
                key={item.id}
                onClick={() => onModuleClick(item)}
              >
                <h1>{item.module_title}</h1>
              </div>
            </>
          );
        })}
      </div>
      <div>
        {moduleContent.map((item) => {
          return (
            <div
              className={`content ${
                moduleProgress && moduleProgress !== item.id && "hidden"
              }`}
            >
              {item.content.map(({ type, content, id }) => {
                switch (type) {
                  case "mainHeading":
                    return <h3>{content}</h3>;

                  case "subHeading":
                    return <h4>{content}</h4>;

                  case "paragraph":
                    return <p>{content}</p>;

                  case "list":
                    return (
                      <>
                        {/* {content.map((item) => {
                  return <li>{item}</li>;
                })} */}
                        <li key={id} className="ms-3">
                          {content}
                        </li>
                      </>
                    );

                  case "subList":
                    return (
                      <>
                        {/* {content.map((item) => {
                  return <li>{item}</li>;
                })} */}
                        <li key={id} className="ms-5">
                          {content}
                        </li>
                      </>
                    );

                  case "bold":
                    return (
                      <p className="text-center">
                        <strong>{content}</strong>
                      </p>
                    );

                  case "underlined":
                    return (
                      <p>
                        <u>{content}</u>
                      </p>
                    );

                  case "image":
                    return <img src={"./images/" + content} />;

                  default:
                    break;
                }
              })}
            </div>
          );
        })}
      </div>
      {/* <div className="content">{courseContent && <CourseContent />}</div> */}
    </div>
  );
};

export default ModuleContent;
