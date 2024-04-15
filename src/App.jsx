import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/mainScreens/Homepage";
import Courses from "./components/mainScreens/Courses";
import Contact from "./components/mainScreens/Contact";
import MyLearning from "./components/mainScreens/MyLearning";
import UserAccount from "./components/mainScreens/UserAccount";
import LoginSignup from "./components/mainScreens/LoginSignup";
import Layout from "./components/Layout";
import Error from "./components/mainScreens/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="courses" element={<Courses />} />
          <Route path="contact" element={<Contact />} />
          <Route path="myLearning" element={<MyLearning />} />
          <Route path="loginSignup" element={<LoginSignup />} />
          <Route path="userAccount" element={<UserAccount />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
