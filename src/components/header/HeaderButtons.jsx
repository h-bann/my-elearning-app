import React from "react";
import Button from "../genericComponents/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoginState } from "../../redux/accountSlice";

const HeaderButtons = () => {
  const loginState = useSelector(selectLoginState);

  // * CONDITIONAL RENDERING - IF USER IS LOGGED IN, SHOW ONE BUTTON. IF NOT LOGGED IN, SHOW OTHERS
  return loginState === false ? (
    <Link to="/login-signup">
      <Button className="loginButton button" text="Sign up/Login" />
    </Link>
  ) : (
    <Link to="/">
      <Button className="myAccountButton button" text="My Account" />
    </Link>
  );
};

export default HeaderButtons;
