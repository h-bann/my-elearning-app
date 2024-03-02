import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/screens/Homepage";
import LoginSignup from "./components/screens/LoginSignup";
import Contact from "./components/screens/Contact";
import MyLearning from "./components/screens/MyLearning";
import Courses from "./components/screens/Courses";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/loginSignup" element={<LoginSignup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myLearning" element={<MyLearning />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
      <Footer />{" "}
    </>
  );
};

export default App;
