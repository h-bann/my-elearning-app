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
    const updatedState = { ...state, [e.target.id]: e.target.value };
    setState(updatedState);
  };

  useEffect(() => {
    formValidation(state, loginSchema, setErrors);
  }, [state, setErrors]);

  const handleLogin = (e) => {
    e.preventDefault();
    const encryptedPassword = sha256(state.Password + "myFunApp");
    if (signupDetails) {
      const { password } = signupDetails;
      const { username } = signupDetails;
      if (encryptedPassword === password && state.Username === username) {
        return dispatch(setLoginState(true)), dispatch(setMainScreen(0));
      }
      dispatch(setError(true));
    }
  };

  return (
    <form className="login-form" onInput={onInput} onSubmit={handleLogin}>
      <div className="login-fields">
        <Label htmlFor="username" text="Username" />
        <Input type="text" id="Username" name="username" />
        {state.Username && <p>{errors.Username}</p>}
      </div>
      <div className="login-fields">
        <Label htmlFor="password" text="Password" />
        <Input type="password" id="Password" name="password" />
        {state.Password && <p>{errors.Password}</p>}
      </div>
      {error && <p>Username or password not valid</p>}
      <Button className="login-button button" text="Login" type="submit" />
    </form>
  );
};

export default LoginContainer;
