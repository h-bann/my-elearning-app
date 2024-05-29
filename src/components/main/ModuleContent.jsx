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

  const onModuleClick = async (item) => {
    dispatch(setCourseContent(item.content));
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
  console.log(window.innerWidth);
  console.log(moduleContent);
  console.log(state);

  if (window.innerWidth < 365) {
    return (
      window.innerWidth < 365 && (
        <div className="module-container">
          <div className="modules">
            {moduleContent.map((item) => {
              return (
                <div
                  className={`individual-module`}
                  key={item.id}
                  onClick={() => onModuleClick(item)}
                >
                  <h1>{item.module_title}</h1>
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
                </div>
              );
            })}
          </div>
          {/* <div className="content">{courseContent && <CourseContent />}</div> */}
        </div>
      )
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
