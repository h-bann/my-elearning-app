import Container from "react-bootstrap/Container";
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
        <Container className="">
          <Link to="/" className="navLink">
            <Navbar.Brand>
              <Logo /> We Learn
            </Navbar.Brand>
          </Link>

          <Nav className="">
            <Navigation />
            <HeaderButtons />
          </Nav>
        </Container>
      </Nav>
    </header>
  );
};

export default Header;
