import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "./Logo";
import HeaderButtons from "./HeaderButtons";
import Navigation from "./Navigation";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="d-flex align-items-center justify-content-between">
      <Nav expand="md" className="w-100 m-auto">
        <Container className="d-flex  justify-content-between align-items-center w-100">
          <Navbar.Brand onClick={() => dispatch(setMainScreen(0))}>
            <Logo /> We Learn
          </Navbar.Brand>

          <Nav className="me-0 ">
            <Navigation />
            <HeaderButtons />
          </Nav>
        </Container>
      </Nav>
    </header>
  );
};

export default Header;
