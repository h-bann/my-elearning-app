import React from "react";
import { Link } from "react-router-dom";

const MyLink = (props) => {
  return (
    <h6>
      <Link to={props.to} onClick={props.onClick}>
        {props.text}
      </Link>
    </h6>
  );
};

export default MyLink;
