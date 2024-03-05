import React from "react";
import data from "../../courseContent.json";

const CourseContent = () => {
  const data2 = { ...data };
  const cardText = data[0].cardText[0];
  const { learningObjectives } = data[1];
  console.log(learningObjectives);
  return (
    <div className="mainContainer">
      <div>{cardText}</div>
      <div>
        {learningObjectives.map((item) => (
          <li>{item}</li>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
