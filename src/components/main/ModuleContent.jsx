import React, { useEffect, useState } from "react";
import {
  selectModuleContent,
  selectCourseContent,
  setCourseContent,
  setCourseProgress,
  selectEnrolledCourses,
  setEnrolledCourses,
  selectCourseProgress,
} from "../../redux/coursesSlice";
import { url } from "../../config";
import { clearLocal, getFromLocal } from "../../storage";

import { useDispatch, useSelector } from "react-redux";
import CourseContent from "./CourseContent";
import axios from "axios";

const ModuleContent = ({ moduleId }) => {
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleContent = useSelector(selectModuleContent);
  const courseContent = useSelector(selectCourseContent);
  const courseProgress = useSelector(selectCourseProgress);
  const dispatch = useDispatch();
  const [state, setState] = useState(moduleContent[0].id);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const styles = {
    // width: "15rem",
    // height: "5rem",
  };

  const getEnrolledCourses = async () => {
    const { data } = await axios.get(`${url}/courses/getEnrolledCourses`, {
      headers: { token: getFromLocal("token") },
    });
    dispatch(setEnrolledCourses(data.enrolledCourses));
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  useEffect(() => {
    if (enrolledCourses.length) {
      const index = enrolledCourses.find((item) => {
        return item.course_id === moduleContent[0].course_id;
      });
      if (index) {
        setState(index.course_progress);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  const onModuleClick = async (item) => {
    // dispatch(setCourseContent(item.content));
    setState(item.id);
    const { data } = await axios.patch(
      `${url}/courses/courseProgress  `,
      { moduleId: item.id, courseId: item.course_id },
      {
        headers: { token: getFromLocal("token") },
      }
    );
  };

  if (!moduleContent || state === null) {
    <p>Loading</p>;
  }

  if (innerWidth < 365) {
    return (
      <div className="module-container">
        <div className="modules">
          {moduleContent.map((item) => {
            return (
              <div
                className={`individual-module`}
                key={item.id}
                onClick={() => onModuleClick(item)}
              >
                <div className="module-tabs">
                  <h1>{item.module_title}</h1>
                  <div
                    className={`svg-container ${
                      state && state !== item.id && "rotated"
                    }`}
                  >
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
                  </div>
                </div>
                <div
                  className={`content ${
                    state && state !== item.id && "hidden"
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
              </div>
            );
          })}
        </div>
        {/* <div className="content">{courseContent && <CourseContent />}</div> */}
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="modules">
        {moduleContent.map((item) => {
          return (
            <>
              <div
                className={`individual-module ${
                  state === item.id && "selected"
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
              className={`content ${state && state !== item.id && "hidden"}`}
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
