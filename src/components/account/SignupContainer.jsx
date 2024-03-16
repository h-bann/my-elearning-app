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
    setState(updatedState);
  };

  useEffect(() => {
    formValidation(state, signupSchema, setErrors);
  }, [state, setErrors]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!errors && state.passwordConfirmation === state.password) {
      dispatch(setLoginState(true));
      dispatch(setMainScreen(0));
      dispatch(setSignupDetails(state));
    }
  };

  return (
    <form className="signup-form" onInput={onInput} onSubmit={onSubmit}>
      <div className="signup-fields">
        <Label htmlFor="email" text="Email" />
        <Input type="text" id="email" name="email" />
        {state.email && <p>{errors.email}</p>}
      </div>

      <div className="signup-fields">
        <Label htmlFor="username" text="Enter chosen username" />
        <Input type="text" id="username" name="username" />
        {state.username && <p>{errors.username}</p>}
      </div>

      <div className="signup-fields">
        <Label htmlFor="password" text="Password" />
        <Input type="password" id="password" name="password" />
        {state.password && <p>{errors.password}</p>}
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
      <Button className="signup-button button" text="Sign Up" type="submit" />
    </form>
  );
};

export default SignupContainer;
