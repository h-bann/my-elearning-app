import React from "react";
import { useSelector } from "react-redux";
import { selectCourseContent } from "../../redux/coursesSlice";

const CourseContent = () => {
  const courseContent = useSelector(selectCourseContent);

  return (
    <>
      <div className="courseContainer">{courseContent}</div>
    </>
  );
};

export default CourseContent;
