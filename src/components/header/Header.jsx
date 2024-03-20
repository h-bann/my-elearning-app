import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import HeaderButtons from "./HeaderButtons";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-expand-sm navbar-expand-lg ">
        <div className="container-fluid ">
          <Logo />
          <div className="navbar-collapse collapse" id="navbarSupportedContent">
            <Nav />
            <HeaderButtons />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
