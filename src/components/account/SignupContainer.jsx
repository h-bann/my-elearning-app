import React from "react";
import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignupEmail,
  setSignupUsername,
  setSignupPassword,
  selectSignupEmail,
  selectSignupPassword,
  selectSignupUsername,
} from "../../redux/accountSlice";
import { storeInLocal } from "../../storage";

const SignupContainer = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectSignupEmail);
  const username = useSelector(selectSignupUsername);
  const password = useSelector(selectSignupPassword);

  const handleEmailInput = (e) => {
    dispatch(setSignupEmail(e.target.value));
  };

  const handleUsernameInput = (e) => {
    dispatch(setSignupUsername(e.target.value));
  };

  const handlePasswordInput = (e) => {
    dispatch(setSignupPassword(e.target.value));
  };

  const handleSubmit = () => {
    storeInLocal("email", email);
    storeInLocal("username", username);
    storeInLocal("password", password);
  };

  return (
    <form className="signup-form">
      <div className="signup-fields">
        <Label htmlFor="email" text="Email" />
        <Input
          type="text"
          id="email"
          name="email"
          onChange={handleEmailInput}
        />
      </div>
      <div className="signup-fields">
        <Label htmlFor="new-username" text="Enter chosen username" />
        <Input
          type="text"
          id="new-username"
          name="new-username"
          onChange={handleUsernameInput}
        />
      </div>
      <div className="signup-fields">
        <Label htmlFor="new-password" text="Password" />
        <Input
          type="password"
          id="new-password"
          name="new-password"
          onChange={handlePasswordInput}
        />
      </div>
      <div className="signup-fields">
        <Label htmlFor="confirm-password" text="Confirm Password" />
        <Input type="password" id="confirm-password" name="confirm-password" />
      </div>
      <Button
        className="signup-button button"
        text="Sign Up"
        onClick={() => {
          handleSubmit();
        }}
      />
    </form>
  );
};

export default SignupContainer;
