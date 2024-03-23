import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginState, setMainScreen } from "../../redux/accountSlice";
import {
  setModuleContent,
  setCourseContent,
  setCoursesScreen,
} from "../../redux/coursesSlice";

const Nav = () => {
  const loginState = useSelector(selectLoginState);
  const dispatch = useDispatch();

  return (
    // * if user is logged in, display My Learning in nav

    <div className="navbar-nav me-auto  mb-lg-0">
      <a
        className="nav-link text-primary-emphasis "
        href="#"
        onClick={() => {
          dispatch(setMainScreen(0));
        }}
      >
        Home
      </a>
      <a
        className=" nav-link "
        href="#"
        onClick={() => {
          dispatch(setMainScreen(1));
          dispatch(setCoursesScreen(0));
          dispatch(setModuleContent(null));
          dispatch(setCourseContent(null));
        }}
      >
        Courses
      </a>
      {loginState && (
        <a
          className="nav-link"
          href="#"
          onClick={() => {
            dispatch(setMainScreen(2));
          }}
        >
          My Learning
        </a>
      )}
      <a
        className="nav-link "
        href="#"
        onClick={() => {
          dispatch(setMainScreen(3));
        }}
      >
        Contact
      </a>
    </div>
  );
};

export default Nav;
