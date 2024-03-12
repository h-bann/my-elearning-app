import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import {
  selectSignUpDetails,
  selectLoginDetails,
  setLoginState,
  setLoginDetails,
  setMainScreen,
  selectError,
  setError,
} from "../../redux/accountSlice";
import { getFromLocal } from "../../storage";
import sha256 from "sha256";
import Error from "../genericComponents/Error";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const signUpDetails = useSelector(selectSignUpDetails);
  const loginDetails = useSelector(selectLoginDetails);
  const error = useSelector(selectError);
  const [state, setState] = useState({});

  const onInput = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const encryptedPassword = sha256(state.loginPassword + "myFunApp");
    const { signupPassword } = signUpDetails;
    encryptedPassword === signupPassword
      ? (dispatch(setLoginState(true)),
        dispatch(setMainScreen(0)),
        dispatch(setError(false)))
      : dispatch(setError(true));
  };

  return (
    <form className="login-form" onInput={onInput}>
      <div className="login-fields">
        <Label htmlFor="loginUsername" text="Username" />
        <Input type="text" id="loginUsername" name="loginUsername" />
      </div>
      <div className="login-fields">
        <Label htmlFor="loginPassword" text="Password" />
        <Input type="password" id="loginPassword" name="loginPassword" />
      </div>
      {error && <p>Please try again</p>}
      <Button
        className="login-button button"
        text="Login"
        onClick={handleLogin}
      />
    </form>
  );
};

export default LoginContainer;
