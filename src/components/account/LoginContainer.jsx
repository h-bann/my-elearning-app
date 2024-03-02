import React from "react";
import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  setLoginState,
  setLoginDetails,
  setScreen,
} from "../../redux/accountSlice";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  const onInput = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(setLoginState(true));
    dispatch(setScreen(0));
    dispatch(setLoginDetails(state));
  };

  return (
    <form className="login-form" onInput={onInput}>
      <div className="login-fields">
        <Label htmlFor="loginUsername" text="Username" />
        <Input type="text" id="loginUsername" name="loginUsername" />
      </div>
      <div className="login-fields">
        <Label htmlFor="loginPassword" text="Password" />
        <Input type="password" id="loginPassword" name="loginPassword" />
      </div>
      <Button
        className="login-button button"
        text="Login"
        onClick={handleLogin}
      />
    </form>
  );
};

export default LoginContainer;
