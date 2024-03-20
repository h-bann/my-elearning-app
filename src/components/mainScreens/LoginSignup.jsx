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
    <div className="container ">
      <div className="row ">
        <div className="col">
          {view ? <SignupContainer /> : <LoginContainer />}
        </div>

        <div className="col d-flex flex-column  justify-content-center align-items-center">
          {view ? <h6>Already have an account?</h6> : <h6>Need an account?</h6>}

          <Button
            className="btn-outline-primary"
            onClick={onClick}
            text={view ? "Sign In" : "Sign Up"}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
