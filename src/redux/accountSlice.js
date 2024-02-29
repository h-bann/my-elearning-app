import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

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
  },
});

export const { setSignupEmail, setSignupUsername, setSignupPassword } =
  accountSlice.actions;

// * this is how you retrieve from store
export const selectSignupEmail = (state) => state.account.email;
export const selectSignupUsername = (state) => state.account.username;
export const selectSignupPassword = (state) => state.account.password;

export default accountSlice.reducer;
