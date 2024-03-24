import React from "react";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={`btn  ${props.className
        .map((item) => {
          return item + " ";
        })
        .join("")}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
