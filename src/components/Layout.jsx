import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
// import Interface from "../components/Interface";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginState, setLoginState } from "../redux/accountSlice";
import { clearLocal, getFromLocal } from "../storage";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
