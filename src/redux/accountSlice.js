import { createSlice } from "@reduxjs/toolkit";
import {
  getFromLocal,
  storeMultipleInLocal,
  storeSingleInLocal,
} from "../storage";
import sha256 from "sha256";

const initialState = {
  loggedIn: getFromLocal("token") ? true : false,
  mainScreen: 0,
  error: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSignupDetails: (state, { payload }) => {
      if (payload.password.length != 64) {
        payload.password = sha256(payload.password + "myFunApp");
      }
      state.storeSignup = payload;
      state.loggedIn = true;
      if (state.mainScreen === 4) {
        return;
      }
      state.mainScreen = 0;

      storeMultipleInLocal({ ...payload });
    },

    setLoginDetails: (state, { payload }) => {
      payload.password = sha256(payload.password + "myFunApp");
      state.storeLogin = payload;
      state.setError = true;
      state.mainScreen = 0;
      storeMultipleInLocal({ ...payload });
    },
    setUserId: (state, { payload }) => {
      state.userId = payload;
    },
    setLoginState: (state, { payload }) => {
      state.loggedIn = payload;
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
  setUserId,
  setLoginState,
  setMainScreen,
  setError,
} = accountSlice.actions;

// * this is how you retrieve from store

export const selectLoginState = (state) => state.account.loggedIn;
export const selectSignupDetails = (state) => state.account.storeSignup;
export const selectLoginDetails = (state) => state.account.storeLogin;
export const selectUserId = (state) => state.account.userId;
export const selectMainScreen = (state) => state.account.mainScreen;
export const selectError = (state) => state.account.error;

export default accountSlice.reducer;
