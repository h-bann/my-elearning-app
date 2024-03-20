import React from "react";

const Label = (props) => {
  return (
    <label className={props.className} htmlFor={props.htmlFor}>
      {props.text}
    </label>
  );
};

export default Label;
