import { createSlice } from "@reduxjs/toolkit";
import sha256 from "sha256";

const initialState = null;

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactForm: (state, { payload }) => {
      state.contactForm = payload;
    },
  },
});

export const { setContactForm } = contactSlice.actions;

// * this is how you retrieve from store

export const selectLoginState = (state) => state.account.loggedIn;

export default contactSlice.reducer;
