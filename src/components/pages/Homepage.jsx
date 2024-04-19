import React from "react";
import { selectLoginState, setLoginState } from "../../redux/accountSlice";
import { useSelector } from "react-redux";

const Homepage = () => {
  return (
    <div className="container-lg text-center">
      <p> This is the homepage for the e-learning platform.</p>
    </div>
  );
};

export default Homepage;
