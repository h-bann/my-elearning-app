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
      {view && (
        <div className="login-signup-container row align-items-center ">
          <div className="col ">
            <SignupContainer />
          </div>

          <div className="col d-flex flex-column  justify-content-center align-items-center">
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
        <div className="login-signup-container row align-items-center ">
          <div className="col d-flex flex-column  justify-content-center align-items-center">
            <h6>Need an account?</h6>

            <Button
              className={["btn-outline-primary"]}
              onClick={onClick}
              text={view ? "Sign In" : "Sign Up"}
            />
          </div>
          <div className="col ">
            <LoginContainer />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
