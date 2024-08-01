import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  enrolledCourses: [],
  moduleProgress: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload }) => {
      state.courses = payload;
    },
    setEnrolledCourses: (state, { payload }) => {
      state.enrolledCourses = payload;
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
    setModuleProgress: (state, { payload }) => {
      if (Array.isArray(payload) || payload === null) {
        state.moduleProgress = payload;
        return;
      }
      if (state.moduleProgress.includes(payload) === false) {
        state.moduleProgress.push(payload);
      }
    },
    setActiveCourse: (state, { payload }) => {
      state.activeCourse = payload;
    },
  },
});

export const {
  setCourses,
  setEnrolledCourses,
  setModuleContent,
  setCourseContent,
  setMoreInfoContent,
  setModuleProgress,
  setActiveCourse,
} = coursesSlice.actions;

// * this is how you retrieve from store

export const selectCourses = (state) => state.courses.courses;
export const selectEnrolledCourses = (state) => state.courses.enrolledCourses;
export const selectModuleContent = (state) => state.courses.moduleContent;
export const selectCourseContent = (state) => state.courses.courseContent;
export const selectMoreInfoContent = (state) => state.courses.moreInfo;
export const selectModuleProgress = (state) => state.courses.moduleProgress;
export const selectActiveCourse = (state) => state.courses.activeCourse;

export default coursesSlice.reducer;
