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
      className={props.className}
    ></input>
  );
};

export default Input;
