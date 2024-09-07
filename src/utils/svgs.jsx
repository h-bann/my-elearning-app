import React from "react";

export const DownArrow = (props) => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
        fill="#0F0F0F"
      />
    </svg>
  );
};

export const GreenTick = (props) => {
  return (
    <svg viewBox="0 0 100 100" fill="#02a315" className={props.className}>
      <circle cx="50" cy="50" r="45" fill="green" />
      <path
        d="M30 50 L45 65 L70 40"
        stroke="white"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// export const greenTick = (
//   <svg viewBox="0 0 24 24" fill="#02a315" className="svg-container">
//     <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z" />
//   </svg>
// );
