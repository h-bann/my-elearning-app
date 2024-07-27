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

const ModuleContent = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleContent = useSelector(selectModuleContent);
  const courseContent = useSelector(selectCourseContent);
  const moduleProgress = useSelector(selectModuleProgress);
  const activeCourse = useSelector(selectActiveCourse);
  // const [courseProgress, setCourseProgress] = useState(moduleContent[0].id);
  const [hideContent, setHideContent] = useState(true);
  const [activeModule, setActiveModule] = useState();
  const [loading, setLoading] = useState(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [imageZoom, setImageZoom] = useState(false);
  const [courseComplete, setCourseComplete] = useState(false);
  const reachedBottom = usePageBottom();

  const styles = {
    // width: "15rem",
    // height: "5rem",
  };

  const tick = (
    <svg viewBox="0 0 24 24" fill="#02a315" className="svg-container">
      <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z" />
    </svg>
  );

  const downArrow = (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="down-arrow"
    >
      <path
        d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
        fill="#0F0F0F"
      />
    </svg>
  );

  useEffect(() => {
    const getEnrolledCourses = async () => {
      try {
        const { data: userModuleProgress } = await axios.get(
          `${url}/courses/userProgress`,
          {
            headers: { token: getFromLocal("token"), id: activeCourse },
          }
        );
        dispatch(setModuleProgress(userModuleProgress.message));
      } catch (error) {
        console.error("Failed to fetch module progress", error);
      }
    };
    getEnrolledCourses();
  }, [activeCourse]);

  // when user clicks new module and state changes, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // set component's innerWidth state to the width of the window as it is resized by user
  // ! NEED TO OPTIMISE THIS TO STOP COMPONENT RE-RENDER
  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  const onModuleClick = async (item) => {
    // functionality to make modules toggle correctly in mobile view
    setHideContent(true);
    setActiveModule(item.id);
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
    // const { data: userModuleProgress } = await axios.get(
    //   `${url}/courses/userProgress`,
    //   {
    //     headers: { token: getFromLocal("token"), id: item.course_id },
    //   }
    // );
    // dispatch(setModuleProgress(userModuleProgress.message));
    // console.log(userModuleProgress);
  };

  // useEffect(() => {
  //   const updateEnrolled = async () => {
  //     if (moduleProgress === courses[0].modules.length && reachedBottom) {
  //       setCourseComplete(true);
  //       const { data: courseComplete } = await axios.patch(
  //         `${url}/courses/courseCompletion`,
  //         { courseId: courses[0].modules[0].id },
  //         { headers: { token: getFromLocal("token") } }
  //       );
  //       console.log(courseComplete);
  //     }
  //   };
  //   updateEnrolled();
  // }, [moduleProgress]);

  const onImageClick = () => {
    setImageZoom(!imageZoom);
  };

  if (!moduleContent || !moduleProgress || !moduleProgress.module_ids) {
    <p>Loading</p>;
  }
  // if (loading) return <p>Loading.....</p>;

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
                  <div
                    className="individual-module"
                    key={modulesItem.id}
                    onClick={() => onModuleClick(modulesItem)}
                  >
                    <div className="module-tabs">
                      <h1>{modulesItem.module_title}</h1>
                      <div className="module-tabs-svg">
                        <div>
                          {moduleProgress?.module_ids?.map((moduleId) => {
                            if (moduleId === modulesItem.id) {
                              return tick;
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
                      {content.map(({ type, content, id }) => {
                        switch (type) {
                          case "mainHeading":
                            return <h3 key={id}>{content}</h3>;

                          case "subHeading":
                            return <h4 key={id}>{content}</h4>;

                          case "paragraph":
                            return <p key={id}>{content}</p>;

                          case "list":
                            return (
                              <>
                                <li key={id} className="main-list-item">
                                  {content}
                                </li>
                              </>
                            );

                          case "subList":
                            return (
                              <>
                                <li key={id} className="sub-list-item">
                                  {content}
                                </li>
                              </>
                            );

                          case "bold":
                            return (
                              <p key={id} className="text-center">
                                <strong>{content}</strong>
                              </p>
                            );

                          case "underlined":
                            return (
                              <p key={id}>
                                <u>{content}</u>
                              </p>
                            );

                          case "image":
                            return (
                              <img
                                key={id}
                                src={"./images/" + content}
                                onClick={onImageClick}
                                className={imageZoom ? "image-zoom" : null}
                              />
                            );

                          default:
                            break;
                        }
                      })}
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
