import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginState } from "../../redux/accountSlice";
import { setScreen } from "../../redux/accountSlice";

const Nav = () => {
  const loginState = useSelector(selectLoginState);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setScreen());
  };

  return (
    // * if user is logged in, display My Learning in nav
    <nav>
      <a
        onClick={() => {
          dispatch(setScreen(0));
        }}
      >
        Home
      </a>
      <a
        onClick={() => {
          dispatch(setScreen(1));
        }}
      >
        Courses
      </a>

      {loginState && (
        <a
          onClick={() => {
            dispatch(setScreen(2));
          }}
        >
          My Learning
        </a>
      )}

      <a
        onClick={() => {
          dispatch(setScreen(3));
        }}
      >
        Contact
      </a>
    </nav>
  );
};

export default Nav;
