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
      <div className="form-floating mb-3">
        <Input
          className="form-control"
          id="floatingInput"
          type="text"
          name="username"
          placeholder="username"
        />
        <Label htmlFor="username" text="Username" />
        {state.username && errors.username ? (
          <p className="form-text">{errors.username}</p>
        ) : undefined}
      </div>

      <div className="form-floating mb-3">
        <Input
          className="form-control"
          id="floatingInput"
          type="password"
          name="password"
          placeholder="password"
        />
        <Label htmlFor="password" text="Password" />
        {state.password && errors.password ? (
          <p className="form-text">{errors.password}</p>
        ) : undefined}
      </div>

      {error && <p className="form-text">Username or password not valid</p>}

      <Button
        className="btn-primary"
        text="Login"
        type="submit"
        disabled={!state || errors ? true : false}
      />
    </form>
  );
};

export default LoginContainer;
