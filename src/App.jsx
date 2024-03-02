import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/screens/Homepage";
import LoginSignup from "./components/screens/LoginSignup";
import Contact from "./components/screens/Contact";
import MyLearning from "./components/screens/MyLearning";
import Courses from "./components/screens/Courses";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Interface from "./components/Interface";

const App = () => {
  return (
    <>
      <Header />
      <Interface />
      <Footer />
    </>
  );
};

export default App;
