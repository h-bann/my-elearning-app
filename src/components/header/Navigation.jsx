import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginState, setMainScreen } from "../../redux/accountSlice";
import {
  setModuleContent,
  setCourseContent,
  setCoursesScreen,
} from "../../redux/coursesSlice";
import { selectMainScreen } from "../../redux/accountSlice";
import Nav from "react-bootstrap/Nav";

const Navigation = () => {
  const loginState = useSelector(selectLoginState);
  const mainScreen = useSelector(selectMainScreen);
  const dispatch = useDispatch();

  return (
    // * if user is logged in, display My Learning in nav
    <>
      <Nav.Link
        className={` ${mainScreen === 0 && "link"}`}
        href="#"
        onClick={() => {
          dispatch(setMainScreen(0));
        }}
      >
        Home
      </Nav.Link>

      <Nav.Link
        className={` ${mainScreen === 1 ? "link" : ""}`}
        href="#"
        onClick={() => {
          dispatch(setMainScreen(1));
          // dispatch(setCoursesScreen(0));
          dispatch(setModuleContent(null));
          dispatch(setCourseContent(null));
        }}
      >
        Courses
      </Nav.Link>

      {loginState && (
        <Nav.Link
          className={` ${mainScreen === 2 ? "link" : ""}`}
          href="#"
          onClick={() => {
            dispatch(setMainScreen(2));
            dispatch(setModuleContent(null));
            dispatch(setCourseContent(null));
          }}
        >
          My Learning
        </Nav.Link>
      )}

      <Nav.Link
        className={`${mainScreen === 3 ? "link" : ""}`}
        href="#"
        onClick={() => {
          dispatch(setMainScreen(3));
        }}
      >
        Contact
      </Nav.Link>
    </>
  );
};

export default Navigation;
