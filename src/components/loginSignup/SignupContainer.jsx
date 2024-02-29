import React from "react";
import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";

const SignupContainer = () => {
  return (
    <div className="signup-form">
      <div className="signup-fields">
        <Label htmlFor="email" text="Email" />
        <Input type="email" id="email" name="email" />
      </div>
      <div className="signup-fields">
        <Label htmlFor="username" text="Enter chosen username" />
        <Input type="text" id="username" name="username" />
      </div>
      <div className="login-fields">
        <Label htmlFor="password" text="Password" />
        <Input type="password" id="password" name="password" />
      </div>
      <div className="login-fields">
        <Label htmlFor="confirmPassword" text="Confirm Password" />
        <Input type="password" id="confirmPassword" name="confirmPassword" />
      </div>
      <Button className="signup-button button" text="Sign Up" />
    </div>
  );
};

export default SignupContainer;
