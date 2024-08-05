import React, { useEffect, useState } from "react";
import {
  selectModuleContent,
  selectCourseContent,
  setCourseContent,
  setModuleProgress,
  selectEnrolledCourses,
  setEnrolledCourses,
  selectModuleProgress,
  selectActiveCourse,
  selectCourses,
} from "../../redux/coursesSlice";
import { url } from "../../config";
import { clearLocal, getFromLocal } from "../../storage";
import { useDispatch, useSelector } from "react-redux";
import CourseContent from "./CourseContent";
import axios from "axios";
import usePageBottom from "../../utils/hooks";
import { greenTick, downArrow } from "../../utils/svgs";

const ModuleContent = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleContent = useSelector(selectModuleContent);
  const moduleProgress = useSelector(selectModuleProgress);
  const activeCourse = useSelector(selectActiveCourse);
  const [hideContent, setHideContent] = useState(true);
  const [activeModule, setActiveModule] = useState();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [courseComplete, setCourseComplete] = useState(false);
  const reachedBottom = usePageBottom();

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

  const onModuleClick = async (item) => {
    setHideContent(true);
    setActiveModule(item.id);
    // functionality to make modules toggle correctly in mobile view
    if (reachedBottom) {
      dispatch(setModuleProgress(item.id));
    }

    if (activeModule === item.id) {
      setHideContent(!hideContent);
    }

    const { data } = await axios.patch(
      `${url}/courses/moduleProgress`,
      { moduleId: item.id, courseId: item.course_id },
      {
        headers: { token: getFromLocal("token") },
      }
    );

    const activeCourse = enrolledCourses.find((foundItem) => {
      return foundItem.course_id === item.course_id;
    });
    if (activeCourse.modules.length === item.id) {
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
  console.log(reachedBottom);
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
                const { content } = modulesItem;
                return (
                  <div className="individual-module" key={modulesItem.id}>
                    <div
                      className="module-tabs"
                      onClick={() => onModuleClick(modulesItem)}
                    >
                      <h1>{modulesItem.module_title}</h1>
                      <div className="module-tabs-svg">
                        <div>
                          {moduleProgress?.map((moduleId) => {
                            if (moduleId === modulesItem.id) {
                              return greenTick;
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
                    </div>
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
