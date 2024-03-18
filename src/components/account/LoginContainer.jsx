import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  selectSignupDetails,
  setLoginState,
  setMainScreen,
  selectError,
  setError,
  setLoginDetails,
} from "../../redux/accountSlice";
import sha256 from "sha256";
import { loginSchema, formValidation } from "../../utils/Joi";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const signupDetails = useSelector(selectSignupDetails);
  const error = useSelector(selectError);
  const [state, setState] = useState({});
  const [errors, setErrors] = useState("");

  const onInput = (e) => {
    const updatedState = { ...state, [e.target.name]: e.target.value };
    formValidation(updatedState, loginSchema, setErrors);
    setState(updatedState);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const encryptedPassword = sha256(state.password + "myFunApp");
    if (signupDetails) {
      const { password, username } = signupDetails;
      encryptedPassword === password && state.username === username
        ? dispatch(setLoginDetails(state))
        : dispatch(setError(true));
    }
  };

  return (
    <form className="login-form" onInput={onInput} onSubmit={handleLogin}>
      <div className="login-fields">
        <Label htmlFor="username" text="Username" />
        <Input type="text" name="username" />
        {state.username && errors.username ? (
          <p>{errors.username}</p>
        ) : undefined}
      </div>

      <div className="login-fields">
        <Label htmlFor="password" text="Password" />
        <Input type="password" name="password" />
        {state.password && errors.password ? (
          <p>{errors.password}</p>
        ) : undefined}
      </div>

      {error && <p>Username or password not valid</p>}

      <Button
        className="btn btn-outline-primary"
        text="Login"
        type="submit"
        disabled={!state || errors ? true : false}
      />
    </form>
  );
};

export default LoginContainer;
