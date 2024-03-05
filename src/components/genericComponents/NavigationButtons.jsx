import React from "react";
import Button from "./Button";

const NavigationButtons = (props) => {
  return (
    <>
      <Button
        className={props.className}
        onClick={props.onBackClick}
        text={props.backText}
      />
      <Button
        className={props.className}
        onClick={props.onNextClick}
        text={props.nextText}
      />
    </>
  );
};

export default NavigationButtons;
