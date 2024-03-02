import React from "react";
import Button from "../genericComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginState,
  setLoginState,
  setScreen,
} from "../../redux/accountSlice";

const HeaderButtons = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLoginState);

  // * CONDITIONAL RENDERING - IF USER IS LOGGED IN, SHOW ONE BUTTON. IF NOT LOGGED IN, SHOW OTHERS
  return loginState === false ? (
    <a
      onClick={() => {
        dispatch(setScreen(5));
      }}
    >
      Sign up/Login
    </a>
  ) : (
    <>
      <a
        onClick={() => {
          dispatch(setScreen(4));
        }}
      >
        My Account
      </a>
      <a
        onClick={() => {
          dispatch(setLoginState(false));
          dispatch(setScreen(0));
        }}
      >
        Log Out
      </a>
    </>
  );
};

export default HeaderButtons;
