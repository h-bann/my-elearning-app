import React from "react";
import { useSelector } from "react-redux";
import {
  selectCourseContent,
  selectModuleContent,
} from "../../redux/coursesSlice";

const CourseContent = () => {
  const id = useSelector(selectCourseContent);
  const moduleContent = useSelector(selectModuleContent);
  const courseContent = moduleContent.modules.filter((item) => {
    return item.id === id;
  });

  return (
    // ! IF DATA IS AN ARRAY THEN MAP OVER IT. ELSE, PRINT AS STRING
    <>
      {Array.isArray(courseContent[0].content) &&
        courseContent[0].content.map((item) => {
          return <li>{item}</li>;
        })}
      {typeof courseContent[0].content === "string" &&
        courseContent.map((item) => {
          return <li>{item.content}</li>;
        })}
    </>
  );
};

export default CourseContent;
