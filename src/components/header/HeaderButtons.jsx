import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginState,
  setLoginState,
  setMainScreen,
  setError,
  selectMainScreen,
} from "../../redux/accountSlice";
import { clearLocal, getFromLocal } from "../../storage";
import Nav from "react-bootstrap/Nav";
import axios from "axios";

const HeaderButtons = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLoginState);
  const mainScreen = useSelector(selectMainScreen);

  const onLogOutClick = async () => {
    const { data } = await axios.delete(`http://localhost:6001/users/logout`, {
      headers: { token: getFromLocal("token") },
    });
    if (data.code) {
      dispatch(setLoginState(false));
      dispatch(setMainScreen(0));
      dispatch(setError(false));
      clearLocal();
    }
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
