import React, { useCallback } from "react";
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
  setLocalStorage,
} from "../../redux/accountSlice";
import sha256 from "sha256";

const SignupContainer = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectSignupEmail);
  const username = useSelector(selectSignupUsername);
  const password = useSelector(selectSignupPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLocalStorage(email, username, password));
  };

  return (
    <form className="signup-form">
      <div className="signup-fields">
        <Label htmlFor="email" text="Email" />
        <Input
          type="text"
          id="email"
          name="email"
          onInput={(e) => {
            dispatch(setSignupEmail(e.target.value));
          }}
        />
      </div>
      <div className="signup-fields">
        <Label htmlFor="new-username" text="Enter chosen username" />
        <Input
          type="text"
          id="new-username"
          name="new-username"
          onInput={(e) => {
            dispatch(setSignupUsername(e.target.value));
          }}
        />
      </div>
      <div className="signup-fields">
        <Label htmlFor="new-password" text="Password" />
        <Input
          type="password"
          id="new-password"
          name="new-password"
          onInput={(e) => {
            dispatch(setSignupPassword(sha256(e.target.value)));
          }}
        />
      </div>
      <div className="signup-fields">
        <Label htmlFor="confirm-password" text="Confirm Password" />
        <Input type="password" id="confirm-password" name="confirm-password" />
      </div>
      <Button
        className="signup-button button"
        text="Sign Up"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default SignupContainer;
