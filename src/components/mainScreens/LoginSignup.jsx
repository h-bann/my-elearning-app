import React from "react";
import LoginContainer from "../account/LoginContainer";
import SignupContainer from "../account/SignupContainer";

const LoginSignup = () => {
  return (
    <div className="login-signup-container">
      <LoginContainer />
      <SignupContainer />
    </div>
  );
};

export default LoginSignup;
