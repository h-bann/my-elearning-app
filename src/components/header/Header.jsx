import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import HeaderButtons from "./HeaderButtons";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="container-fluid">
          <Logo />
          <Nav />
          <HeaderButtons />
        </div>
      </nav>
    </header>
  );
};

export default Header;
