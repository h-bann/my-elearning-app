import React, { useState } from "react";
import LoginContainer from "../account/LoginContainer";
import SignupContainer from "../account/SignupContainer";
import Button from "../genericComponents/Button";
import "./loginSignup.scss";

const LoginSignup = () => {
  const [view, setView] = useState(true);

  const onClick = () => {
    setView(!view);
  };

  return (
    <>
      {view && (
        <div className="login-signup-container">
          <div className="signup-subcontainer">
            <SignupContainer />
          </div>

          <div className="login-subcontainer">
            <h6>Already have an account?</h6>

            <Button
              className={["btn-outline-primary"]}
              onClick={onClick}
              text={view ? "Sign In" : "Sign Up"}
            />
          </div>
        </div>
      )}

      {!view && (
        <div className="login-signup-container">
          <div className="signup-subcontainer">
            <h6>Need an account?</h6>

            <Button
              className={["btn-outline-primary"]}
              onClick={onClick}
              text={view ? "Sign In" : "Sign Up"}
            />
          </div>
          <div className="login-subcontainer">
            <LoginContainer />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
