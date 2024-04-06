import React, { useEffect, useState } from "react";
import { setLoginState, setMainScreen } from "../../redux/accountSlice";
import { useDispatch } from "react-redux";
import Button from "../genericComponents/Button";
import Input from "../genericComponents/Input";
import Label from "../genericComponents/Label";
import { formValidation, userDetailsResetSchema } from "../../utils/Joi";
import axios from "axios";
import { getFromLocal } from "../../storage";

const MyAccount = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("");
  const [errors, setErrors] = useState("");
  const [userInput, setUserInput] = useState();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("http://localhost:6001/users/getUser", {
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
    const { data } = await axios.patch(
      `http://localhost:6001/users/update`,
      newState,
      {
        headers: { token: getFromLocal("token") },
      }
    );
    if (data.code) {
      setDisplay("");
    }
  };

  const deleteAccount = async () => {
    const { data } = await axios.delete(`http://localhost:6001/users/delete`, {
      headers: { token: getFromLocal("token") },
    });
    if (data.code) {
      dispatch(setLoginState(false));
      dispatch(setMainScreen(0));
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
    <div className="container-sm">
      <form
        className="form-signin"
        onInput={onInput}
        onSubmit={updateUserDetails}
      >
        {/* CHANGE THIS BACK EVENTUALLY */}
        {/* <ChangeUsername /> */}
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
              {email && display === "email" && errors.email ? (
                <p className="form-text">{errors.email}</p>
              ) : undefined}
              <Button
                className={["btn-outline-primary"]}
                type="submit"
                text="Save"
                disabled={!userInput || errors ? true : false}
              />
            </div>
          )}
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
              {username && display === "username" && errors.username ? (
                <p className="form-text">{errors.username}</p>
              ) : undefined}
              <Button
                className={["btn-outline-primary"]}
                type="submit"
                text="Save"
                disabled={!userInput || errors ? true : false}
              />
            </div>
          )}
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
              {password && display === "password" && errors.password ? (
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
                disabled={!userInput || errors ? true : false}
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
