import React from "react";
import Homepage from "./mainScreens/Homepage";
import { useSelector } from "react-redux";
import { selectMainScreen } from "../redux/accountSlice";
import UserAccount from "./mainScreens/UserAccount";
import Courses from "./mainScreens/Courses";
import MyLearning from "./mainScreens/MyLearning";
import Contact from "./mainScreens/Contact";
import LoginSignup from "./mainScreens/LoginSignup";

const Interface = () => {
  const screen = useSelector(selectMainScreen);

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
