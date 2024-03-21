import React from "react";
import { useSelector } from "react-redux";
import {
  selectCourseContent,
  selectModuleContent,
} from "../../redux/coursesSlice";

const CourseContent = () => {
  const courseContent = useSelector(selectCourseContent);
  const moduleContent = useSelector(selectModuleContent);
  // const courseContent = moduleContent.modules.filter((item) => {
  //   return item.id === id;
  // });
  console.log(courseContent);

  return (
    // ! IF DATA IS AN ARRAY THEN MAP OVER IT. ELSE, PRINT AS STRING
    <div>
      {courseContent &&
        Array.isArray(courseContent) &&
        courseContent.map((item) => {
          return <li>{item}</li>;
        })}

      {courseContent && typeof courseContent === "string" && (
        <p>{courseContent}</p>
      )}
    </div>
  );
};

export default CourseContent;
