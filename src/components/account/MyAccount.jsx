import React, { useEffect, useState } from "react";
import { setLoginState, setMainScreen } from "../../redux/accountSlice";
import { useDispatch } from "react-redux";
import Button from "../genericComponents/Button";
import Input from "../genericComponents/Input";
import Label from "../genericComponents/Label";
import { formValidation, userDetailsResetSchema } from "../../utils/Joi";
import axios from "axios";
import { getFromLocal, clearLocal } from "../../storage";
import { url } from "../../config";
import { useNavigate } from "react-router-dom";
import "../account/myAccount.scss";

const MyAccount = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("");
  const [errors, setErrors] = useState("");
  const [userInput, setUserInput] = useState();
  const [userDetails, setUserDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`${url}/users/getUser`, {
        headers: { token: getFromLocal("token") },
      });
      if (data.code) {
        setUserDetails(data.user);
      }
    };
    getUser();
  }, [display]);

  const onInput = (e) => {
    const updatedState = { ...userInput, [e.target.name]: e.target.value };
    formValidation(updatedState, userDetailsResetSchema, setErrors);
    setUserInput(updatedState);
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    const { passwordConfirmation, currentPassword, ...newState } = userInput;
    const { data } = await axios.patch(`${url}/users/update`, newState, {
      headers: { token: getFromLocal("token") },
    });
    if (data.code) {
      setDisplay(null);
      setUserInput(null);
    }
    if (!data.code) {
      setUserInput(null);
      setErrors(data.message);
    }
  };

  const deleteAccount = async () => {
    const { data } = await axios.delete(`${url}/users/delete`, {
      headers: { token: getFromLocal("token") },
    });
    if (data.code) {
      dispatch(setLoginState(false));
      navigate("/homepage");
      clearLocal();
    }
  };

  if (!userDetails) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  const { email, username, password } = userDetails;
  return (
    <div className="main-container">
      <h3 className="">My Account Details</h3>

      <form
        className="form-signin"
        onInput={onInput}
        onSubmit={updateUserDetails}
      >
        <div className="details-container">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <p className="">{email}</p>
          {display != "email" && (
            <Button
              className={["btn-outline-primary", "account"]}
              onClick={() => {
                setDisplay("email");
                setErrors("");
              }}
              text="Change Email"
            />
          )}
          {display === "email" && (
            <div className="hidden-input">
              <Input
                type="email"
                name="email"
                placeholder="New email address"
                className="form-control"
              />
              {email && display === "email" && errors.email ? (
                <p className="form-text">{errors.email}</p>
              ) : (
                <p className="form-text">{errors}</p>
              )}
              <Button
                className={["btn-outline-primary"]}
                type="submit"
                text="Save"
                disabled={!userInput || errors ? true : false}
              />
            </div>
          )}
        </div>

        <div className="details-container">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <p className="fw-light">{username}</p>
          {display != "username" && (
            <Button
              className={["btn-outline-primary", "account"]}
              onClick={() => {
                setDisplay("username");
                setErrors("");
              }}
              text="Change username"
            />
          )}
          {display === "username" && (
            <div className="hidden-input">
              <Input
                type="text"
                name="username"
                placeholder="New username"
                className="form-control"
              />
              {username && display === "username" && errors.username ? (
                <p className="form-text">{errors.username}</p>
              ) : (
                <p className="form-text">
                  {typeof errors === "object" ? JSON.stringify(errors) : errors}
                </p>
              )}
              <Button
                className={["btn-outline-primary"]}
                type="submit"
                text="Save"
                disabled={!userInput || errors ? true : false}
              />
            </div>
          )}
        </div>

        <div className="details-container password">
          <label htmlFor="password" className="form-label">
            Password Reset
          </label>
          {display != "password" && (
            <Button
              className={["btn-outline-primary", "account"]}
              onClick={() => {
                setDisplay("password");
                setErrors("");
              }}
              text="Reset password"
            />
          )}
          {display === "password" && (
            <div className="hidden-input">
              <Label
                htmlFor="password"
                className="sub-form-label"
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
                className="sub-form-label"
                text="New password:"
              />
              <Input
                type="password"
                name="password"
                placeholder="New password"
                className="form-control mb-3"
              />
              {password && display === "password" && errors.password ? (
                <p className="form-text">{errors.password}</p>
              ) : errors ? (
                <p className="form-text">{errors}</p>
              ) : undefined}

              <Label
                htmlFor="passwordConfirmation"
                text="Confirm new password:"
                className="sub-form-label"
              />
              <Input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm new password"
                className="form-control mb-3"
              />
              {userInput &&
                userInput.passwordConfirmation != userInput.password && (
                  <p className="form-text">Passwords do not match</p>
                )}
              <Button
                className={["btn-outline-primary"]}
                type="submit"
                text="Save"
                disabled={
                  !userInput ||
                  errors ||
                  userInput.passwordConfirmation != userInput.password
                    ? true
                    : false
                }
              />
            </div>
          )}
        </div>
      </form>
      <div className="p-3">
        <Button
          className={["btn-danger"]}
          type="button"
          text="Delete Account"
          onClick={deleteAccount}
        />
      </div>
    </div>
  );
};

export default MyAccount;
