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
      <form
        className="form-signin"
        onInput={onInput}
        onSubmit={updateUserDetails}
      >
        <h3 className="h3 mb-4">My Account Details</h3>

        <div className="mb-4 d-flex flex-column">
          <label htmlFor="email" className="form-label h5">
            Email
          </label>
          <p className="fw-light">{email}</p>
          {display != "email" && (
            <Button
              className={["btn-outline-primary", "account"]}
              onClick={() => setDisplay("email")}
              text="Change Email"
            />
          )}
          {display === "email" && (
            <div className="mb-3">
              <Input
                type="email"
                name="email"
                placeholder="New email address"
                className="form-control"
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

        <div className="mb-3  d-flex flex-column">
          <label htmlFor="username" className="form-label h5">
            Username
          </label>
          <p className="fw-light">{username}</p>
          {display != "username" && (
            <Button
              className={["btn-outline-primary", "account"]}
              onClick={() => setDisplay("username")}
              text="Change username"
            />
          )}
          {display === "username" && (
            <div>
              <Input
                type="text"
                name="username"
                placeholder="New username"
                className="form-control"
              />
              <Button
                className={["btn-outline-primary"]}
                type="submit"
                text="Save"
                disabled={!userInput ? true : false}
              />
            </div>
          )}
          {userInput.username && errors.username ? (
            <p className="form-text">{errors.username}</p>
          ) : undefined}
        </div>

        <div className="mb-3 d-flex flex-column">
          <label htmlFor="password" className="form-label h5">
            Password Reset
          </label>
          {display != "password" && (
            <Button
              className={["btn-outline-primary", "account"]}
              onClick={() => setDisplay("password")}
              text="Reset password"
            />
          )}
          {display === "password" && (
            <div>
              <Label
                htmlFor="password"
                className="form-label"
                text="Current password:"
              />
              <Input
                type="password"
                name="currentPassword"
                placeholder="Current password"
                className="form-control mb-3"
              />

              <Label
                htmlFor="newPassword"
                className="form-label"
                text="New password:"
              />
              <Input
                type="password"
                name="password"
                placeholder="New password"
                className="form-control mb-3"
              />
              {userInput.password && errors.password ? (
                <p className="form-text">{errors.password}</p>
              ) : undefined}

              <Label
                htmlFor="passwordConfirmation"
                text="Confirm new password:"
                className="form-label"
              />
              <Input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm new password"
                className="form-control mb-3"
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
