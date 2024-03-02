import React from "react";
import { Link } from "react-router-dom";
import Button from "../genericComponents/Button";
import { useSelector } from "react-redux";
import { selectLoginState } from "../../redux/accountSlice";

const Nav = () => {
  const loginState = useSelector(selectLoginState);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="courses">Courses</Link>
      {loginState === true && <Link to="/myLearning">My Learning</Link>}
      <Link to="/contact">Contact</Link>
    </nav>
  );
};

export default Nav;
