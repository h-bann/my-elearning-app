import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  selectSignupDetails,
  selectError,
  setError,
  setLoginDetails,
  setLoginState,
  setMainScreen,
} from "../../redux/accountSlice";
import sha256 from "sha256";
import { loginSchema, formValidation } from "../../utils/Joi";
import axios from "axios";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const [errors, setErrors] = useState("");
  const [accountError, setAccountError] = useState();

  const onInput = (e) => {
    const updatedUserInput = { ...userInput, [e.target.name]: e.target.value };
    formValidation(updatedUserInput, loginSchema, setErrors);
    setUserInput(updatedUserInput);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:6001/users/login",
      userInput
    );
    if (data.code === 0) {
      setAccountError(data.message);
    }
    if (data.code === 1) {
      dispatch(setLoginState(true));
      dispatch(setMainScreen(0));
    }
  };
  return (
    <form className="form-signin" onInput={onInput} onSubmit={handleLogin}>
      <h1 className="h3 mb-3 fw-formal">Please sign in</h1>
      <div className="form-floating">
        <Input
          className="form-control"
          type="text"
          name="username"
          placeholder="username"
        />
        <Label htmlFor="username" text="Username" />
        {userInput.username && errors.username ? (
          <p className="form-text">{errors.username}</p>
        ) : undefined}
      </div>

      <div className="form-floating ">
        <Input
          className="form-control"
          type="password"
          name="password"
          placeholder="password"
        />
        <Label htmlFor="password" text="Password" />
        {userInput.password && errors.password ? (
          <p className="form-text">{errors.password}</p>
        ) : undefined}
      </div>

      <Button
        className={["btn btn-primary", "w-100"]}
        text="Login"
        type="submit"
        disabled={!userInput || errors ? true : false}
      />
      {accountError && <h6>{accountError}</h6>}
    </form>
  );
};

export default LoginContainer;
