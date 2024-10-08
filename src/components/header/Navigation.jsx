import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginState } from "../../redux/accountSlice";
import {
  selectModuleContent,
  setActiveCourse,
  setModuleContent,
} from "../../redux/coursesSlice";
import { NavLink } from "react-router-dom";
import ModulesContainer from "../Content/ModulesContainer";
import "../header/header.scss";

const Navigation = () => {
  const loginState = useSelector(selectLoginState);
  const moduleContent = useSelector(selectModuleContent);
  const dispatch = useDispatch();

  return (
    <div className="sub-dropdown">
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        to="/courses"
      >
        Courses
      </NavLink>
      {/* // * if user is logged in, display My Learning in nav */}
      {loginState && (
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/my-learning"
        >
          My Learning
        </NavLink>
      )}
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        to="/contact"
      >
        Contact
      </NavLink>
    </div>
  );
};

export default Navigation;
