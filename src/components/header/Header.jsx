import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "./Logo";
import HeaderButtons from "./HeaderButtons";
import Navigation from "./Navigation";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <header className="">
      <Nav expand="md" className="">
        <div className="nav-logo">
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
        </div>

        <dic className="navbar">
          <Navigation />
          <HeaderButtons />
        </dic>
      </Nav>
    </header>
  );
};

export default Header;
