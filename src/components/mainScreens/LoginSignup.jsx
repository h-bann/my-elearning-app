import React, { useState } from "react";
import LoginContainer from "../account/LoginContainer";
import SignupContainer from "../account/SignupContainer";
import Button from "../genericComponents/Button";

const LoginSignup = () => {
  const [view, setView] = useState(true);

  const onClick = () => {
    setView(!view);
  };

  return (
    <>
      <div className="login-signup-container">
        <div>{view ? <SignupContainer /> : <LoginContainer />}</div>
        <div>
          {view ? <h6>Already have an account?</h6> : <h6>Need an account?</h6>}

          <Button
            className="button"
            onClick={onClick}
            text={view ? "Sign In" : "Sign Up"}
          />
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
