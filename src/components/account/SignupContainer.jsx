import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoginState } from "../../redux/accountSlice";
import { url } from "../../config";
import { storeSingleInLocal } from "../../storage";
import { formValidation, signupSchema } from "../../utils/Joi";
import axios from "axios";
import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import "./signupContainer.scss";

const SignupContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [errors, setErrors] = useState("");
  const [accountError, setAccountError] = useState();

  const onInput = (e) => {
    const updatedState = { ...userInput, [e.target.name]: e.target.value };
    formValidation(updatedState, signupSchema, setErrors);
    setUserInput(updatedState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // stops passwordConfirmation from being sent to store
    const { passwordConfirmation, ...newState } = userInput;

    const { data } = await axios.post(`${url}/users/addUser`, newState);
    console.log(data);
    if (!data.code) {
      setAccountError(data.message);
      return;
    }
    if (data.code) {
      navigate("/");
      storeSingleInLocal("token", data.token);
      dispatch(setLoginState(true));
    }
  };

  return (
    <form className="form-signin" onInput={onInput} onSubmit={onSubmit}>
      <h3>Sign up here</h3>

      <div className="form-floating">
        <Input
          className="form-control form-control-sm signup-email"
          type="email"
          name="email"
          placeholder="name@example.com"
        />
        <Label htmlFor="email" text="Email address" />
        {userInput.email && errors.email ? (
          <p className="form-text">{errors.email}</p>
        ) : undefined}
      </div>

      <div className="form-floating">
        <Input
          className="form-control"
          type="text"
          name="username"
          placeholder="example"
        />
        <Label htmlFor="username" text="Username" />

        {userInput.username && errors.username ? (
          <p className="form-text">{errors.username}</p>
        ) : undefined}
      </div>

      <div className="form-floating  ">
        <Input
          className="form-control"
          type="password"
          name="password"
          placeholder="password"
        />
        <Label htmlFor="password" text="Password" />

        {userInput.password && errors.password ? (
          <p className="form-text">{errors.password}</p>
        ) : undefined}
      </div>

      <div className="form-floating ">
        <Input
          className="form-control"
          type="password"
          name="passwordConfirmation"
          placeholder="passwordConfirmation"
        />
        <Label htmlFor="passwordConfirmation" text="Confirm Password" />

        {userInput.passwordConfirmation &&
          userInput.passwordConfirmation != userInput.password && (
            <p className="form-text">Passwords do not match</p>
          )}
      </div>
      <div className="">
        <Button
          className={["btn-primary"]}
          text="Sign Up"
          type="submit"
          disabled={!userInput || errors ? true : false}
        />
      </div>
      {accountError && <h6>{accountError}</h6>}
    </form>
  );
};

export default SignupContainer;
