import Label from "../genericComponents/Label";
import Input from "../genericComponents/Input";
import Button from "../genericComponents/Button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLoginState } from "../../redux/accountSlice";
import { loginSchema, formValidation } from "../../utils/Joi";
import axios from "axios";
import { storeSingleInLocal } from "../../storage";
import { useNavigate } from "react-router-dom";
import { url } from "../../config";
import "./loginContainer.scss";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    const { data } = await axios.post(`${url}/users/login`, userInput);
    if (!data.code) {
      setAccountError(data.message);
    }
    if (data.code) {
      dispatch(setLoginState(true));
      navigate("/");
      storeSingleInLocal("token", data.token);
    }
  };

  return (
    <form className="form-signin" onInput={onInput} onSubmit={handleLogin}>
      <h3 className="">Please sign in</h3>
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
        className={["btn btn-primary"]}
        text="Login"
        type="submit"
        disabled={!userInput || errors ? true : false}
      />

      {accountError && <h6>{accountError}</h6>}
    </form>
  );
};

export default LoginContainer;
