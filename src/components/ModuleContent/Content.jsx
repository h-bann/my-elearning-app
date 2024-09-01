import React from "react";
import CourseContent from "./CourseContent";
import Button from "../genericComponents/Button";

const Content = ({ activeModule, isHidden, module, lastItem, onNextClick }) => {
  const { content } = module;
  return (
    <div
      key={module.id}
      className={`content ${
        isHidden && activeModule === module.id ? "displayed" : "hidden"
      }`}
    >
      <CourseContent content={content} />
      <div className="next-button">
        <Button
          className={["btn-primary"]}
          text={lastItem[0].id === module.id ? "Finish Course" : "Next Module"}
          onClick={() => onNextClick(module)}
        />
      </div>
    </div>
  );
};

export default Content;
