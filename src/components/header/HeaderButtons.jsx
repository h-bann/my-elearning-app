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
import { Link, useNavigate } from "react-router-dom";

const HeaderButtons = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLoginState);
  const mainScreen = useSelector(selectMainScreen);
  const loggedIn = getFromLocal("token");

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
  return !loggedIn ? (
    <Link
      className={` ${mainScreen === 5 ? "link" : ""}`}
      to="/loginSignup"
      onClick={() => {
        dispatch(setMainScreen(5));
      }}
    >
      Sign up/Login
    </Link>
  ) : (
    <>
      <Link
        className={`${mainScreen === 4 ? "link" : ""}`}
        to="/userAccount"
        onClick={() => {
          dispatch(setMainScreen(4));
        }}
      >
        My Account
      </Link>
      <Link className="" to="/homepage" onClick={onLogOutClick}>
        Log Out
      </Link>
    </>
  );
};

export default HeaderButtons;
