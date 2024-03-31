import { useState } from "react";
import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import { useDispatch } from "react-redux";
import {
  setLoginState,
  setMainScreen,
  setSignupDetails,
} from "../../redux/accountSlice";
import { formValidation, signupSchema } from "../../utils/Joi";
import axios from "axios";

const SignupContainer = () => {
  const dispatch = useDispatch();
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

    const { data } = await axios.post("http://localhost:6001/users", newState);
    console.log(data);
    if (data.code === 0) {
      setAccountError(data.message);
      return;
    }
    if (data.code === 1) {
      dispatch(setMainScreen(0));
      dispatch(setLoginState(true));
    }
    // dispatch(setSignupDetails(newState));
  };

  return (
    <form className="form-signin" onInput={onInput} onSubmit={onSubmit}>
      <h1 className="h3 mb-3 fw-formal">Sign up here</h1>

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
      <div className="text-center">
        <Button
          className={["btn-primary", "w-100"]}
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
