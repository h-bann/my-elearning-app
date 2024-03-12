import { useState } from "react";
import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignupDetails,
  selectSignUpDetails,
  setMainScreen,
  setLoginState,
} from "../../redux/accountSlice";

const SignupContainer = () => {
  const dispatch = useDispatch();
  const signUpDetails = useSelector(selectSignUpDetails);
  const [state, setState] = useState({});

  const onInput = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoginState(false));
    // dispatch(setMainScreen(0));
    dispatch(setSignupDetails(state));
  };

  return (
    <form className="signup-form" onInput={onInput}>
      <div className="signup-fields">
        <Label htmlFor="email" text="Email" />
        <Input type="text" id="email" name="email" />
      </div>

      <div className="signup-fields">
        <Label htmlFor="signupUsername" text="Enter chosen username" />
        <Input type="text" id="signupUsername" name="signupUsername" />
      </div>

      <div className="signup-fields">
        <Label htmlFor="signupPassword" text="Password" />
        <Input type="password" id="signupPassword" name="signupPassword" />
      </div>

      <div className="signup-fields">
        <Label htmlFor="passwordConfirmation" text="Confirm Password" />
        <Input
          type="password"
          id="passwordConfirmation"
          name="cpasswordConfirmation"
        />
      </div>
      <Button
        className="signup-button button"
        text="Sign Up"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default SignupContainer;
