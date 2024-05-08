import React from "react";
import { useSelector } from "react-redux";
import { selectCourseContent } from "../../redux/coursesSlice";

const CourseContent = () => {
  const courseContent = useSelector(selectCourseContent);

  return (
    <div className="mb-5">
      {courseContent.map(({ type, content }) => {
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
                <li className="ms-3">{content}</li>
              </>
            );

          case "subList":
            return (
              <>
                {/* {content.map((item) => {
                  return <li>{item}</li>;
                })} */}
                <li className="ms-5">{content}</li>
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
};

export default CourseContent;
