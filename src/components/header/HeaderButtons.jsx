import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginState,
  setLoginState,
  setMainScreen,
  setError,
  selectMainScreen,
} from "../../redux/accountSlice";
import { clearLocal } from "../../storage";
import Nav from "react-bootstrap/Nav";

const HeaderButtons = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLoginState);
  const mainScreen = useSelector(selectMainScreen);

  const onLogOutClick = () => {
    dispatch(setLoginState(false));
    dispatch(setMainScreen(0));
    dispatch(setError(false));

    clearLocal();
  };

  // * CONDITIONAL RENDERING - IF USER IS LOGGED IN, SHOW ONE BUTTON. IF NOT LOGGED IN, SHOW OTHERS
  return loginState === false ? (
    <Nav.Link
      className={` ${mainScreen === 5 ? "link" : ""}`}
      href="#"
      onClick={() => {
        dispatch(setMainScreen(5));
      }}
    >
      Sign up/Login
    </Nav.Link>
  ) : (
    <>
      <Nav.Link
        className={`${mainScreen === 4 ? "link" : ""}`}
        href="#"
        onClick={() => {
          dispatch(setMainScreen(4));
        }}
      >
        My Account
      </Nav.Link>
      <Nav.Link className="" href="#" onClick={onLogOutClick}>
        Log Out
      </Nav.Link>
    </>
  );
};

export default HeaderButtons;
