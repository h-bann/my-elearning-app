import React, { useState } from "react";
import {
  selectSignupDetails,
  setSignupDetails,
} from "../../redux/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../genericComponents/Button";
import Input from "../genericComponents/Input";

const MyAccount = () => {
  const [state, setState] = useState();
  const [userInput, setUserInput] = useState();
  const dispatch = useDispatch();
  const signupDetails = useSelector(selectSignupDetails);
  const { email, username, password } = signupDetails;

  const changeEmail = () => {
    console.log("clicked and");
    setState(false);
  };
  const changeUsername = () => {
    console.log("clicked");
  };
  const changePassword = () => {
    console.log("clicked");
  };

  return (
    <div>
      <div>
        <h3>My Account Details</h3>
        <p>Email: {email}</p>
        {state === false ? (
          <Button
            className="button"
            onClick={setState(true)}
            text="Change email"
          />
        ) : (
          <Button className="button" onClick={changeEmail} text="Confirm" />
        )}

        {state && (
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="New email address"
            onInput={(e) => {
              setUserInput(e.target.value);
            }}
          />
        )}

        <p>Username: {username}</p>
        <Button
          className="button"
          onClick={changeUsername}
          text="Change username"
        />

        <p>Password: {password}</p>
        <Button
          className="button"
          onClick={changePassword}
          text="Change password]"
        />
      </div>
      <div></div>
    </div>
  );
};

export default MyAccount;
