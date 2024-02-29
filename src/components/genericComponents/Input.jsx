import React from "react";

const Input = (props) => {
  return (
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};

export default Input;
