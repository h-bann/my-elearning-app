import Homepage from "./mainScreens/Homepage";
import { useSelector } from "react-redux";
import { selectMainScreen } from "../redux/accountSlice";
import UserAccount from "./mainScreens/UserAccount";
import Courses from "./mainScreens/Courses";
import MyLearning from "./mainScreens/MyLearning";
import Contact from "./mainScreens/Contact";
import LoginSignup from "./mainScreens/LoginSignup";

const Interface = () => {
  const mainScreen = useSelector(selectMainScreen);

  return (
    <main className="mx-4">
      {mainScreen === 0 && <Homepage />}
      {mainScreen === 1 && <Courses />}
      {mainScreen === 2 && <MyLearning />}
      {mainScreen === 3 && <Contact />}
      {mainScreen === 4 && <UserAccount />}
      {mainScreen === 5 && <LoginSignup />}
    </main>
  );
};

export default Interface;
