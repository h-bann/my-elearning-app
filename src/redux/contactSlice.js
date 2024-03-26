import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

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

export const selectContactForm = (state) => state.contact.contactForm;

export default contactSlice.reducer;
