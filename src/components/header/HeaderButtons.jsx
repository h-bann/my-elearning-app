import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginState,
  setLoginState,
  setMainScreen,
  setError,
} from "../../redux/accountSlice";
import { clearLocal } from "../../storage";

const HeaderButtons = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLoginState);

  const onLogOutClick = () => {
    dispatch(setLoginState(false));
    dispatch(setMainScreen(0));
    dispatch(setError(false));

    clearLocal();
  };

  // * CONDITIONAL RENDERING - IF USER IS LOGGED IN, SHOW ONE BUTTON. IF NOT LOGGED IN, SHOW OTHERS
  return loginState === false ? (
    <a
      onClick={() => {
        dispatch(setMainScreen(5));
      }}
    >
      Sign up/Login
    </a>
  ) : (
    <>
      <a
        onClick={() => {
          dispatch(setMainScreen(4));
        }}
      >
        My Account
      </a>
      <a onClick={onLogOutClick}>Log Out</a>
    </>
  );
};

export default HeaderButtons;
