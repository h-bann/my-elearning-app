import React from "react";
import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";

const LoginContainer = () => {
  return (
    <div className="login-form">
      <div className="login-fields">
        <Label htmlFor="username" text="Username" />
        <Input type="text" id="username" name="username" />
      </div>
      <div className="login-fields">
        <Label htmlFor="password" text="Password" />
        <Input type="password" id="password" name="password" />
      </div>
      <Button className="login-button button" text="Login" />
    </div>
  );
};

export default LoginContainer;
