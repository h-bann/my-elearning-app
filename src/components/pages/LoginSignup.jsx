import React from "react";

import LoginContainer from "../loginSignup/LoginContainer";
import SignupContainer from "../loginSignup/SignupContainer";

const LoginSignup = () => {
  return (
    <>
      <div className="login-signup-container">
        <LoginContainer />
        <SignupContainer />
      </div>
    </>
  );
};

export default LoginSignup;
