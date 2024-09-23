import { useDispatch, useSelector } from "react-redux";
import { setLoginState, selectMainScreen } from "../../redux/accountSlice";
import { clearLocal, getFromLocal } from "../../storage";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { url } from "../../config";

const HeaderButtons = () => {
  const dispatch = useDispatch();
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
      <Link className="nav-link" to="/login-signup">
        Sign up/Login
      </Link>
    );
  }

  if (loggedIn) {
    return (
      <>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/my-account"
        >
          My Account
        </NavLink>
        <Link className="nav-link" onClick={onLogOutClick}>
          Log Out
        </Link>
      </>
    );
  }
};

export default HeaderButtons;
