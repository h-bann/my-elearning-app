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
    <form className="form-signin" onInput={onInput} onSubmit={onSubmit}>
      <h1 className="h3 mb-3 fw-formal">Sign up here</h1>

      <div className="form-floating">
        <Input
          className="form-control form-control-sm signup-email"
          id="floatingInput"
          type="email"
          name="email"
          placeholder="name@example.com"
        />
        <Label htmlFor="floatingInput" text="Email address" />
        {userInput.email && errors.email ? (
          <p className="form-text">{errors.email}</p>
        ) : undefined}
      </div>

      <div className="form-floating">
        <Input
          className="form-control"
          id="floatingInput"
          type="text"
          name="username"
          placeholder="example"
        />
        <Label htmlFor="floatingInput" text="Username" />

        {userInput.username && errors.username ? (
          <p className="form-text">{errors.username}</p>
        ) : undefined}
      </div>

      <div className="form-floating  ">
        <Input
          className="form-control"
          id="floatingInput"
          type="password"
          name="password"
          placeholder="password"
        />
        <Label htmlFor="floatingInput" text="Password" />

        {userInput.password && errors.password ? (
          <p className="form-text">{errors.password}</p>
        ) : undefined}
      </div>

      <div className="form-floating ">
        <Input
          className="form-control"
          id="floatingInput"
          type="password"
          name="passwordConfirmation"
          placeholder="passwordConfirmation"
        />
        <Label htmlFor="floatingInput" text="Confirm Password" />

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
    </form>
  );
};

export default SignupContainer;
