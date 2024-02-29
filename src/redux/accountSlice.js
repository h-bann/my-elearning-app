import { createSlice } from "@reduxjs/toolkit";
import { storeInLocal } from "../storage";

const initialState = {
  loggedIn: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSignupEmail: (state, { payload }) => {
      state.email = payload;
    },
    setSignupUsername: (state, { payload }) => {
      state.username = payload;
    },
    setSignupPassword: (state, { payload }) => {
      state.password = payload;
    },
    setLocalStorage: (payload) => {
      const { email, username, password } = payload;
      storeInLocal("email", email);
      storeInLocal("username", username);
      storeInLocal("password", password);
    },
  },
});

export const {
  setSignupEmail,
  setSignupUsername,
  setSignupPassword,
  setLocalStorage,
} = accountSlice.actions;

// * this is how you retrieve from store
export const selectSignupEmail = (state) => state.account.email;
export const selectSignupUsername = (state) => state.account.username;
export const selectSignupPassword = (state) => state.account.password;
export const selectLocalStorage = (state) => state.account.store;

export default accountSlice.reducer;
