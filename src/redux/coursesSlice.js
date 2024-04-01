import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coursesScreen: 0,
  courses: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload }) => {
      state.courses = payload;
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
  },
});

export const {
  setCourses,
  setModuleContent,
  setCourseContent,
  setMoreInfoContent,
} = coursesSlice.actions;

// * this is how you retrieve from store

export const selectCourses = (state) => state.courses.courses;
export const selectModuleContent = (state) => state.courses.moduleContent;
export const selectCourseContent = (state) => state.courses.courseContent;
export const selectMoreInfoContent = (state) => state.courses.moreInfo;

export default coursesSlice.reducer;
