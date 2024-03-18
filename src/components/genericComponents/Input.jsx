import React from "react";

const Input = (props) => {
  return (
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onInput={props.onInput}
      className="form-control "
    ></input>
  );
};

export default Input;
