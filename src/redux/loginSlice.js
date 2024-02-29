import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    change: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, change } = loginSlice.actions;

export const selectCount = (state) => state.login.value;

export default loginSlice.reducer;
