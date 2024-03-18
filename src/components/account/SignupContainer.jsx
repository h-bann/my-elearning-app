import { useState } from "react";
import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import { useDispatch } from "react-redux";
import { setSignupDetails } from "../../redux/accountSlice";
import { formValidation, signupSchema } from "../../utils/Joi";

const SignupContainer = () => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const [errors, setErrors] = useState("");

  const onInput = (e) => {
    const updatedState = { ...userInput, [e.target.name]: e.target.value };
    formValidation(updatedState, signupSchema, setErrors);
    setUserInput(updatedState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // stops passwordConfirmation from being sent to store
    const { passwordConfirmation, ...newState } = userInput;
    dispatch(setSignupDetails(newState));
  };

  return (
    <form className="signup-form" onInput={onInput} onSubmit={onSubmit}>
      <div className="signup-fields">
        <Label htmlFor="email" text="Email" />
        <Input type="text" id="email" name="email" />
        {userInput.email && errors.email ? <p>{errors.email}</p> : undefined}
      </div>

      <div className="signup-fields">
        <Label htmlFor="username" text="Enter a username" />
        <Input type="text" id="username" name="username" />
        {userInput.username && errors.username ? (
          <p>{errors.username}</p>
        ) : undefined}
      </div>

      <div className="signup-fields">
        <Label htmlFor="password" text="Enter a password" />
        <Input type="password" id="password" name="password" />
        {userInput.password && errors.password ? (
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
        {userInput.passwordConfirmation &&
          userInput.passwordConfirmation != userInput.password && (
            <p>Passwords do not match</p>
          )}
      </div>
      <Button
        className="btn btn-outline-primary"
        text="Sign Up"
        type="submit"
        disabled={!userInput || errors ? true : false}
      />
    </form>
  );
};

export default SignupContainer;
