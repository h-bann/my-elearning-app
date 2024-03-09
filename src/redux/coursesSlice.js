import { createSlice } from "@reduxjs/toolkit";
import { storeInLocal } from "../storage";

const initialState = {
  coursesScreen: 0,
  modulesScreen: 0,
  contentScreen: 0,
  renderStatus: true,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCoursesScreen: (state, { payload }) => {
      state.coursesScreen = payload;
    },
    setModulesScreen: (state, { payload }) => {
      state.modulesScreen = payload;
    },
    setContentScreen: (state, { payload }) => {
      state.contentScreen = payload;
    },
    setRenderStatus: (state, { payload }) => {
      state.renderStatus = payload;
    },
  },
});

export const {
  setCoursesScreen,
  setModulesScreen,
  setContentScreen,
  setRenderStatus,
  setLocalStorage,
} = coursesSlice.actions;

// * this is how you retrieve from store

export const selectCoursesScreen = (state) => state.courses.coursesScreen;
export const selectModulesScreen = (state) => state.courses.modulesScreen;
export const selectContentScreen = (state) => state.courses.contentScreen;
export const selectRenderStatus = (state) => state.courses.renderStatus;

export default coursesSlice.reducer;
