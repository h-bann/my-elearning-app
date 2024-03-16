import { createSlice } from "@reduxjs/toolkit";
import { storeMultipleInLocal, storeSingleInLocal } from "../storage";
import sha256 from "sha256";

const initialState = {
  loggedIn: false,
  mainScreen: 0,
  error: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSignupDetails: (state, { payload }) => {
      payload.password = sha256(payload.password + "myFunApp");
      payload.passwordConfirmation = sha256(
        payload.passwordConfirmation + "myFunApp"
      );
      state.storeSignup = payload;
      storeMultipleInLocal({ ...payload });
    },
    setLoginDetails: (state, { payload }) => {
      payload.loginPassword = sha256(payload.loginPassword + "myFunApp");
      state.storeLogin = payload;
      storeMultipleInLocal({ ...payload });
    },
    setLoginState: (state, { payload }) => {
      state.loggedIn = payload;
      storeSingleInLocal("loggedIn", payload);
    },
    setMainScreen: (state, { payload }) => {
      state.mainScreen = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const {
  setSignupDetails,
  setLoginDetails,
  setLoginState,
  setMainScreen,
  setError,
} = accountSlice.actions;

// * this is how you retrieve from store

export const selectLoginState = (state) => state.account.loggedIn;
export const selectSignupDetails = (state) => state.account.storeSignup;
export const selectLoginDetails = (state) => state.account.storeLogin;
export const selectMainScreen = (state) => state.account.mainScreen;
export const selectError = (state) => state.account.error;

export default accountSlice.reducer;
