import { createSlice } from "@reduxjs/toolkit";
import { storeInLocal } from "../storage";
import sha256 from "sha256";

const initialState = {
  loggedIn: false,
  screen: 0,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSignupDetails: (state, { payload }) => {
      payload.signupPassword = sha256(payload.signupPassword + "myFunApp");
      payload.passwordConfirmation = sha256(
        payload.passwordConfirmation + "myFunApp"
      );
      state.storeSignup = payload;
      storeInLocal({ ...payload });
    },
    setLoginDetails: (state, { payload }) => {
      payload.loginPassword = sha256(payload.loginPassword + "myFunApp");
      state.storeLogin = payload;
      storeInLocal({ ...payload });
    },
    setLoginState: (state, { payload }) => {
      state.loggedIn = payload;
      storeInLocal(state);
    },
    setScreen: (state, { payload }) => {
      state.screen = payload;
    },
  },
});

export const {
  setSignupDetails,
  setLoginDetails,
  setLoginState,
  setScreen,
  setLocalStorage,
} = accountSlice.actions;

// * this is how you retrieve from store

export const selectLoginState = (state) => state.account.loggedIn;
export const selectScreen = (state) => state.account.screen;

export default accountSlice.reducer;
