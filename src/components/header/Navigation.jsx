import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginState,
  setMainScreen,
  setLoginState,
} from "../../redux/accountSlice";
import { setModuleContent, setCourseContent } from "../../redux/coursesSlice";
import { selectMainScreen } from "../../redux/accountSlice";
import Nav from "react-bootstrap/Nav";
import { getFromLocal } from "../../storage";
import { Link } from "react-router-dom";

const Navigation = () => {
  const mainScreen = useSelector(selectMainScreen);
  const loginState = useSelector(selectLoginState);
  const dispatch = useDispatch();

  return (
    // * if user is logged in, display My Learning in nav
    <>
      <Link
        className={` ${mainScreen === 0 && "link"}`}
        to="/homepage"
        onClick={() => {
          dispatch(setMainScreen(0));
        }}
      >
        Home
      </Link>

      <Link
        className={`${mainScreen === 1 ? "link" : ""}`}
        to="/courses"
        onClick={() => {
          // dispatch(setMainScreen(1));
          dispatch(setModuleContent(null));
          dispatch(setCourseContent(null));
        }}
      >
        Courses
      </Link>

      {loginState && (
        <Link
          className={` ${mainScreen === 2 ? "link" : ""}`}
          to="/myLearning"
          onClick={() => {
            dispatch(setMainScreen(2));
            dispatch(setModuleContent(null));
            dispatch(setCourseContent(null));
          }}
        >
          My Learning
        </Link>
      )}

      <Link
        className={`${mainScreen === 3 ? "link" : ""}`}
        to="/contact"
        onClick={() => {
          dispatch(setMainScreen(3));
        }}
      >
        Contact
      </Link>
    </>
  );
};

export default Navigation;
