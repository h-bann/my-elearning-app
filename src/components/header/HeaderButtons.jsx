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
import { useEffect } from "react";

const HeaderButtons = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLoginState);
  const mainScreen = useSelector(selectMainScreen);
  // const loggedIn = getFromLocal("loggedIn");
  // console.log(loggedIn);

  useEffect(() => {
    dispatch(setLoginState(getFromLocal("loggedIn")));
  }, []);

  const onLogOutClick = async () => {
    const { data } = await axios.delete(`http://localhost:6001/users/logout`, {
      headers: { token: getFromLocal("token") },
    });
    if (data.code) {
      dispatch(setLoginState(false));
      dispatch(setMainScreen(0));
      clearLocal();
    }
  };
  // * CONDITIONAL RENDERING - IF USER IS LOGGED IN, SHOW ONE BUTTON. IF NOT LOGGED IN, SHOW OTHERS
  return loginState === false ? (
    <Nav.Link
      className={` ${mainScreen === 5 ? "link" : ""}`}
      href="/loginSignup"
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
        href="/userAccount"
        onClick={() => {
          dispatch(setMainScreen(4));
        }}
      >
        My Account
      </Nav.Link>
      <Nav.Link className="" href="/homepage" onClick={onLogOutClick}>
        Log Out
      </Nav.Link>
    </>
  );
};

export default HeaderButtons;
