import { useDispatch, useSelector } from "react-redux";
import {
  setLoginState,
  setMainScreen,
  selectMainScreen,
} from "../../redux/accountSlice";
import { clearLocal, getFromLocal } from "../../storage";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../config";

const HeaderButtons = () => {
  const dispatch = useDispatch();
  const mainScreen = useSelector(selectMainScreen);
  const loggedIn = getFromLocal("token");
  const navigate = useNavigate();

  const onLogOutClick = async () => {
    const { data } = await axios.delete(`${url}/users/logout`, {
      headers: { token: getFromLocal("token") },
    });
    if (data.code) {
      dispatch(setLoginState(false));
      clearLocal();
      navigate("/");
    }
  };

  // * CONDITIONAL RENDERING - IF USER IS LOGGED IN, SHOW ONE BUTTON. IF NOT LOGGED IN, SHOW OTHERS
  if (!loggedIn) {
    return (
      <Link
        className=""
        to="/loginSignup"
        onClick={() => {
          dispatch(setMainScreen(5));
        }}
      >
        Sign up/Login
      </Link>
    );
  }

  if (loggedIn) {
    return (
      <>
        <Link className="" to="/userAccount">
          My Account
        </Link>
        <Link className="" onClick={onLogOutClick}>
          Log Out
        </Link>
      </>
    );
  }
  // !loggedIn ? (
  //   <Link
  //     className=""
  //     to="/loginSignup"
  //     onClick={() => {
  //       dispatch(setMainScreen(5));
  //     }}
  //   >
  //     Sign up/Login
  //   </Link>
  // ) : (
  //   <>
  //     <Link className="" to="/userAccount">
  //       My Account
  //     </Link>
  //     <Link className="" onClick={onLogOutClick}>
  //       Log Out
  //     </Link>
  //   </>
  // );
};

export default HeaderButtons;
