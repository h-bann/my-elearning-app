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

  const onClick = () => {
    dispatch(setMainScreen());
  };

  return (
    // * if user is logged in, display My Learning in nav
    <nav>
      <a
        onClick={() => {
          dispatch(setMainScreen(0));
        }}
      >
        Home
      </a>
      <a
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
          onClick={() => {
            dispatch(setMainScreen(2));
          }}
        >
          My Learning
        </a>
      )}

      <a
        onClick={() => {
          dispatch(setMainScreen(3));
        }}
      >
        Contact
      </a>
    </nav>
  );
};

export default Nav;
