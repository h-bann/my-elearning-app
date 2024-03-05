import React from "react";
import data from "../courseContent.json";

const CourseContent = () => {
  return (
    <>
      {data[0].learningObjectives.map((item) => {
        return <h6>{item}</h6>;
      })}
    </>
  );
};

export default CourseContent;
