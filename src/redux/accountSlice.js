import { createSlice } from "@reduxjs/toolkit";
import { storeInLocal } from "../storage";
import sha256 from "sha256";

const initialState = {
  loggedIn: false,
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
      state.store = payload;
    },
    setLocalStorage: (state, { payload }) => {
      storeInLocal({ ...payload });
    },
    setLoginState: (state) => {
      state.loggedIn = !state.loggedIn;
    },
  },
});

export const { setSignupDetails, setLocalStorage, setLoginState } =
  accountSlice.actions;

// * this is how you retrieve from store

export const selectLocalStorage = (state) => state.account.store;

export default accountSlice.reducer;
