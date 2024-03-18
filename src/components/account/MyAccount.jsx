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
    dispatch(setSignupDetails(newState));
    if (encryptedPassword && encryptedPassword === password) {
      dispatch(setSignupDetails(newState));
    } else {
      console.log("notworked");
    }
    setDisplay("");
  };
  console.log(userInput);

  return (
    <div>
      <form onInput={onInput} onSubmit={updateUserDetails}>
        <h3>My Account Details</h3>
        <div>
          <h4>Email</h4>
          <p> {email}</p>
          {display != "email" && (
            <Button
              className="button"
              onClick={() => setDisplay("email")}
              text="Change Email"
            />
          )}
          {display === "email" && (
            <Input type="email" name="email" placeholder="New email address" />
          )}
          {userInput.email && errors.email ? <p>{errors.email}</p> : undefined}
        </div>

        <div>
          <h4>Username</h4>
          <p>{username}</p>
          {display != "username" && (
            <Button
              className="button"
              onClick={() => setDisplay("username")}
              text="Change username"
            />
          )}
          {display === "username" && (
            <Input type="text" name="username" placeholder="New username" />
          )}
          {userInput.username && errors.username ? (
            <p>{errors.username}</p>
          ) : undefined}
        </div>

        <div>
          <h4>Password reset</h4>
          {display != "password" && (
            <Button
              className="button"
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
            </div>
          )}
        </div>
        <Button
          className="button"
          type="submit"
          text="Confirm changes"
          disabled={!userInput ? true : false}
        />
      </form>
    </div>
  );
};

export default MyAccount;
