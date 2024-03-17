import React, { useState } from "react";
import {
  selectSignupDetails,
  setSignupDetails,
} from "../../redux/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../genericComponents/Button";
import Input from "../genericComponents/Input";

const MyAccount = () => {
  const [state, setState] = useState("");
  const [userInput, setUserInput] = useState();
  const dispatch = useDispatch();
  const signupDetails = useSelector(selectSignupDetails);
  const { email, username, password } = signupDetails;

  const onInput = (e) => {
    setUserInput({ ...signupDetails, [e.target.name]: e.target.value });
  };

  const updateUserDetails = () => {
    dispatch(setSignupDetails(userInput));
  };

  return (
    <div>
      <div>
        <h3>My Account Details</h3>
        <div>
          <p>Email: {email}</p>
          {state != "email" && (
            <Button
              className="button"
              onClick={() => setState("email")}
              text="Change Email"
            />
          )}

          {state === "email" && (
            <Input
              type="email"
              name="email"
              placeholder="New email address"
              onInput={onInput}
            />
          )}
        </div>

        <div>
          <p>Username: {username}</p>
          {state != "username" && (
            <Button
              className="button"
              onClick={() => setState("username")}
              text="Change username"
            />
          )}
          {state === "username" && (
            <Input
              type="text"
              name="username"
              placeholder="New username"
              onInput={onInput}
            />
          )}
        </div>

        <div>
          <p>Password: {password}</p>
          {state != "password" && (
            <Button
              className="button"
              onClick={() => setState("password")}
              text="Change password"
            />
          )}
          {state === "password" && (
            <Input
              type="text"
              name="password"
              placeholder="New password"
              onInput={onInput}
            />
          )}
        </div>
      </div>
      <Button
        className="button"
        onClick={updateUserDetails}
        text="Confirm changes"
      />
    </div>
  );
};

export default MyAccount;
