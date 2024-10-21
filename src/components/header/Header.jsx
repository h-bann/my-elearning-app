import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "./Logo";
import HeaderButtons from "./HeaderButtons";
import Navigation from "./Navigation";
import "../header/header.scss";
import { BurgerMenu } from "../../utils/svgs";

const Header = () => {
  return (
    <header className="outfit-font">
      <Nav expand="md" className="">
        <div className="nav-logo">
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <h1 className="logo-text navbar-brand">We Learn</h1>
        </div>

        <div className="navbar">
          <BurgerMenu />
          <div className="dropdown">
            <Navigation />
            <HeaderButtons />
          </div>
        </div>
      </Nav>
    </header>
  );
};

export default Header;
