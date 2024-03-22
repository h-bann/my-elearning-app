import React from "react";
import { useSelector } from "react-redux";
import {
  selectCourseContent,
  selectModuleContent,
} from "../../redux/coursesSlice";
import { types } from "joi";

const CourseContent = () => {
  const courseContent = useSelector(selectCourseContent);
  const moduleContent = useSelector(selectModuleContent);
  courseContent.content.map(({ type, content }) => {
    console.log(type);
  });
  console.log(courseContent);

  return (
    // ! IF DATA IS AN ARRAY THEN MAP OVER IT. ELSE, PRINT AS STRING
    <div className="mb-5">
      {courseContent.content.map(({ type, content }) => {
        switch (type) {
          case "mainHeading":
            return <h3>{content}</h3>;

          case "subHeading":
            return <h5>{content}</h5>;

          case "paragraph":
            return <p>{content}</p>;

          case "list":
            return (
              <ul>
                {content.map((item) => {
                  return <li>{item}</li>;
                })}
              </ul>
            );

          case "subList":
            return (
              <ul className="ms-5">
                {content.map((item) => {
                  return <li>{item}</li>;
                })}
              </ul>
            );

          default:
            break;
        }

        {
          /* if (type === "mainHeading") {
          return <h3>{content}</h3>;
        } */
        }
      })}
      {/* 
      {courseContent &&
        Array.isArray(courseContent) &&
        courseContent.map((item) => {
          return <li>{item}</li>;
        })}

      {courseContent && typeof courseContent === "string" && (
        <p>{courseContent}</p>
      )} */}
    </div>
  );
};

export default CourseContent;
