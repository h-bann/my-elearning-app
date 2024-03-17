import { useEffect, useState } from "react";
import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import { useDispatch } from "react-redux";
import {
  setSignupDetails,
  setMainScreen,
  setLoginState,
} from "../../redux/accountSlice";
import { formValidation, signupSchema } from "../../utils/Joi";

const SignupContainer = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const [errors, setErrors] = useState("");

  const onInput = (e) => {
    const updatedState = { ...state, [e.target.id]: e.target.value };
    formValidation(updatedState, signupSchema, setErrors);
    setState(updatedState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setSignupDetails(state));
  };

  return (
    <form className="signup-form" onInput={onInput} onSubmit={onSubmit}>
      <div className="signup-fields">
        <Label htmlFor="email" text="Email" />
        <Input type="text" id="email" name="email" />
        {state.email && errors.email ? <p>{errors.email}</p> : undefined}
      </div>

      <div className="signup-fields">
        <Label htmlFor="username" text="Enter a username" />
        <Input type="text" id="username" name="username" />
        {state.username && errors.username ? (
          <p>{errors.username}</p>
        ) : undefined}
      </div>

      <div className="signup-fields">
        <Label htmlFor="password" text="Enter a password" />
        <Input type="password" id="password" name="password" />
        {state.password && errors.password ? (
          <p>{errors.password}</p>
        ) : undefined}
      </div>

      <div className="signup-fields">
        <Label htmlFor="passwordConfirmation" text="Confirm Password" />
        <Input
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
        />
        {state.passwordConfirmation &&
          state.passwordConfirmation != state.password && (
            <p>Passwords do not match</p>
          )}
      </div>
      <Button
        className="signup-button button"
        text="Sign Up"
        type="submit"
        disabled={!state || errors ? true : false}
      />
    </form>
  );
};

export default SignupContainer;
