import { createSlice } from "@reduxjs/toolkit";
import { storeMultipleInLocal } from "../storage";

const initialState = {
  coursesScreen: 0,
  myLearning: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCoursesScreen: (state, { payload }) => {
      state.coursesScreen = payload;
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
    setMyLearning: (state, { payload }) => {
      const isDuplicate = state.myLearning.some(
        (item) => item.id === payload.id
      );
      if (!isDuplicate) {
        return { ...state, myLearning: [...state.myLearning, payload] };
      }
    },
  },
});

export const {
  setCoursesScreen,
  setModuleContent,
  setCourseContent,
  setMoreInfoContent,
  setMyLearning,
} = coursesSlice.actions;

// * this is how you retrieve from store

export const selectCoursesScreen = (state) => state.courses.coursesScreen;
export const selectModuleContent = (state) => state.courses.moduleContent;
export const selectCourseContent = (state) => state.courses.courseContent;
export const selectMoreInfoContent = (state) => state.courses.moreInfo;
export const seclectMyLearning = (state) => state.courses.myLearning;

export default coursesSlice.reducer;
