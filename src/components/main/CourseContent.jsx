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
            return <h4>{content}</h4>;

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

          case "image":
            return <p>{content}</p>;

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

          default:
            break;
        }
      })}
    </div>
  );
};

export default CourseContent;
