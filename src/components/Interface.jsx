import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginSignup from "./pages/LoginSignup";
import Contact from "./pages/Contact";
import MyLearning from ".//pages/MyLearning";
import Header from "./header/Header";
import Footer from "./Footer";

const Interface = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-learning" element={<MyLearning />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Interface;
