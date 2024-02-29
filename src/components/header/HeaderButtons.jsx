import React from "react";
import Button from "../genericComponents/Button";
import { Link } from "react-router-dom";

const HeaderButtons = () => {
  // * CONDITIONAL RENDERING - IF USER IS LOGGED IN, SHOW ONE BUTTON. IF NOT LOGGED IN, SHOW OTHERS
  return (
    <Link to="/login-signup">
      <Button className="login-button button" text="Sign up/Login" />
    </Link>
  );
};

export default HeaderButtons;
