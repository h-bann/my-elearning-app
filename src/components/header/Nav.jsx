import React from "react";
import { Link } from "react-router-dom";
import Button from "../genericComponents/Button";

const Nav = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/my-learning">My Learning</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
};

export default Nav;
