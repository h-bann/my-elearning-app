import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./views/Homepage";
import LoginSignup from "./views/Account";
import Contact from "./views/Contact";
import MyLearning from "./views/MyLearning";
import Header from "./header/Header";
import Footer from "./footer/Footer";

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
