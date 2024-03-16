import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coursesScreen: 0,
  modulesScreen: 0,
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
    setModuleContent: (state, { payload }) => {
      state.moduleContent = payload;
    },
    setCourseContent: (state, { payload }) => {
      state.courseContent = payload;
    },
    setMoreInfoContent: (state, { payload }) => {
      state.moreInfo = payload;
    },
    // setRenderStatus: (state, { payload }) => {
    //   state.renderStatus = payload;
    // },
  },
});

export const {
  setCoursesScreen,
  setModulesScreen,
  setContentScreen,
  setModuleContent,
  setCourseContent,
  setMoreInfoContent,
  setRenderStatus,
  setLocalStorage,
} = coursesSlice.actions;

// * this is how you retrieve from store

export const selectMainScreen = (state) => state.courses.mainScreen;
export const selectCoursesScreen = (state) => state.courses.coursesScreen;
export const selectModulesScreen = (state) => state.courses.modulesScreen;
export const selectContentScreen = (state) => state.courses.contentScreen;
export const selectModuleContent = (state) => state.courses.moduleContent;
export const selectCourseContent = (state) => state.courses.courseContent;
export const selectMoreInfoContent = (state) => state.courses.moreInfo;
export const selectRenderStatus = (state) => state.courses.renderStatus;

export default coursesSlice.reducer;
