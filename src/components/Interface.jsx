import React from "react";
import Homepage from "./screens/Homepage";
import { useSelector } from "react-redux";
import { selectScreen } from "../redux/accountSlice";
import UserAccount from "./screens/UserAccount";
import Courses from "./screens/Courses";
import MyLearning from "./screens/MyLearning";
import Contact from "./screens/Contact";
import LoginSignup from "./screens/LoginSignup";

const Interface = () => {
  const screen = useSelector(selectScreen);

  return (
    <>
      {screen === 0 && <Homepage />}
      {screen === 1 && <Courses />}
      {screen === 2 && <MyLearning />}
      {screen === 3 && <Contact />}
      {screen === 4 && <UserAccount />}
      {screen === 5 && <LoginSignup />}
    </>
  );
};

export default Interface;
