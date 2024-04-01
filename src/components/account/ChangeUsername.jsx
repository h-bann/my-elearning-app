import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectUserId } from "../../redux/accountSlice";
import axios from "axios";
import Button from "../genericComponents/Button";
import Input from "../genericComponents/Input";
import { formValidation, userDetailsResetSchema } from "../../utils/Joi";

const ChangeUsername = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("");
  const [userInput, setUserInput] = useState();
  const userId = useSelector(selectUserId);
  const [errors, setErrors] = useState("");
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`http://localhost:6001/users/${userId}`);
      setUserDetails(data.user);
    };
    getUser();
  }, [userId, display]);

  const onInput = (e) => {
    const updatedState = { ...userInput, [e.target.name]: e.target.value };
    formValidation(updatedState, userDetailsResetSchema, setErrors);
    setUserInput(updatedState);
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    const { passwordConfirmation, currentPassword, ...newState } = userInput;
    const { data } = await axios.patch(
      `http://localhost:6001/users/${userId}`,
      newState
    );
    console.log(data);
    setDisplay("");
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
    <>
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
              onInput={onInput}
            />
            {email && display === "email" && errors.email ? (
              <p className="form-text">{errors.email}</p>
            ) : undefined}
            <Button
              className={["btn-outline-primary"]}
              type="button"
              text="Save"
              onClick={updateUserDetails}
              disabled={!userInput || errors ? true : false}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ChangeUsername;
