import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import HeaderButtons from "./HeaderButtons";

const Header = () => {
  return (
    <header>
      <div className="outer-header-container">
        <div className="inner-header-container">
          <Logo />
          <Nav />
        </div>
        <div>
          <HeaderButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
