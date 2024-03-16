import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  selectSignupDetails,
  setLoginState,
  setMainScreen,
  selectError,
  setError,
} from "../../redux/accountSlice";
import sha256 from "sha256";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const signupDetails = useSelector(selectSignupDetails);
  const error = useSelector(selectError);
  const [state, setState] = useState({});

  const onInput = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const encryptedPassword = sha256(state.loginPassword + "myFunApp");
    if (signupDetails) {
      const { signupPassword } = signupDetails;
      const { signupUsername } = signupDetails;
      if (
        encryptedPassword === signupPassword &&
        state.loginUsername === signupUsername
      ) {
        return dispatch(setLoginState(true)), dispatch(setMainScreen(0));
      }
      dispatch(setError(true));
    }
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
      {error && <p>Username or password not valid</p>}
      <Button
        className="login-button button"
        text="Login"
        onClick={handleLogin}
      />
    </form>
  );
};

export default LoginContainer;
