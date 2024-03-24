import React, { useState } from "react";
import {
  selectSignupDetails,
  setSignupDetails,
} from "../../redux/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../genericComponents/Button";
import Input from "../genericComponents/Input";
import Label from "../genericComponents/Label";
import { formValidation, userDetailsResetSchema } from "../../utils/Joi";
import sha256 from "sha256";

const MyAccount = () => {
  const dispatch = useDispatch();
  const signupDetails = useSelector(selectSignupDetails);
  const [display, setDisplay] = useState("");
  const [errors, setErrors] = useState("");
  const [userInput, setUserInput] = useState(signupDetails);
  const { email, username } = signupDetails;

  const onInput = (e) => {
    const updatedState = { ...userInput, [e.target.name]: e.target.value };
    formValidation(updatedState, userDetailsResetSchema, setErrors);
    setUserInput(updatedState);
  };

  const updateUserDetails = (e) => {
    e.preventDefault();
    const { passwordConfirmation, currentPassword, ...newState } = userInput;
    const encryptedPassword = sha256(userInput.currentPassword + "myFunApp");
    const { password } = signupDetails;
    if (encryptedPassword && encryptedPassword === password) {
      dispatch(setSignupDetails(newState));
    } else {
      dispatch(setSignupDetails(newState));
    }
    setDisplay("");
  };

  return (
    <div className="container-sm">
      <form onInput={onInput} onSubmit={updateUserDetails}>
        <h3>My Account Details</h3>
        <div>
          <label htmlFor="email">Email</label>
          <p> {email}</p>
          {display != "email" && (
            <Button
              className={["btn-outline-primary"]}
              onClick={() => setDisplay("email")}
              text="Change Email"
            />
          )}
          {display === "email" && (
            <div>
              <Input
                type="email"
                name="email"
                placeholder="New email address"
              />
              <Button
                className={["btn-outline-primary"]}
                type="submit"
                text="Save"
                disabled={!userInput ? true : false}
              />
            </div>
          )}
          {userInput.email && errors.email ? <p>{errors.email}</p> : undefined}
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <p>{username}</p>
          {display != "username" && (
            <Button
              className={["btn-outline-primary"]}
              onClick={() => setDisplay("username")}
              text="Change username"
            />
          )}
          {display === "username" && (
            <div>
              <Input type="text" name="username" placeholder="New username" />
              <Button
                className={["btn-outline-primary"]}
                type="submit"
                text="Save"
                disabled={!userInput ? true : false}
              />
            </div>
          )}
          {userInput.username && errors.username ? (
            <p>{errors.username}</p>
          ) : undefined}
        </div>

        <div>
          <label htmlFor="password">Password Reset</label>
          {display != "password" && (
            <Button
              className={["btn-outline-primary"]}
              onClick={() => setDisplay("password")}
              text="Reset password"
            />
          )}
          {display === "password" && (
            <div>
              <Label htmlFor="password" text="Current password:" />
              <Input
                type="password"
                name="currentPassword"
                placeholder="Current password"
              />

              <Label htmlFor="newPassword" text="New password:" />
              <Input
                type="password"
                name="password"
                placeholder="New password"
              />
              {userInput.password && errors.password ? (
                <p>{errors.password}</p>
              ) : undefined}

              <Label
                htmlFor="passwordConfirmation"
                text="Confirm new password:"
              />
              <Input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm new password"
              />
              <Button
                className={["btn-outline-primary"]}
                type="submit"
                text="Save"
                disabled={!userInput ? true : false}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MyAccount;
