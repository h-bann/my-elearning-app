import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCourseContent } from "../../redux/coursesSlice";

const CourseContent = ({ content }) => {
  const [imageZoom, setImageZoom] = useState(false);

  const onImageClick = () => {
    setImageZoom(!imageZoom);
  };

  return (
    <div className="mb-5">
      {content.map(({ type, content, id }) => {
        switch (type) {
          case "mainHeading":
            return <h3 key={id}>{content}</h3>;

          case "subHeading":
            return <h4 key={id}>{content}</h4>;

          case "paragraph":
            return <p key={id}>{content}</p>;

          case "list":
            return (
              <>
                <li key={id} className="main-list-item">
                  {content}
                </li>
              </>
            );

          case "subList":
            return (
              <>
                <li key={id} className="sub-list-item">
                  {content}
                </li>
              </>
            );

          case "bold":
            return (
              <p key={id} className="text-center">
                <strong>{content}</strong>
              </p>
            );

          case "underlined":
            return (
              <p key={id}>
                <u>{content}</u>
              </p>
            );

          case "image":
            return (
              <img
                key={id}
                src={"./images/" + content}
                onClick={onImageClick}
                className={imageZoom ? "image-zoom" : null}
              />
            );

          default:
            break;
        }
      })}
    </div>
  );
};

export default CourseContent;
