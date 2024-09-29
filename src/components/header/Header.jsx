import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "./Logo";
import HeaderButtons from "./HeaderButtons";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="outfit-font">
      <Nav expand="md" className="">
        <div className="nav-logo">
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <h1 className="logo-text">We Learn</h1>
        </div>

        <div className="navbar">
          <svg
            className="burger-menu"
            width="30px"
            height="54px"
            viewBox="0 0 24 24"
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 18L20 18"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12L20 12"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
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
