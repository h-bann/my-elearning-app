import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  enrolledCourses: [],
  moduleProgress: [],
  // progressBar: [],
  moduleContent: false,
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
    setProgressBar: (state, { payload }) => {
      state.progressBar = payload;

      // if (payload && typeof payload === "object") {
      //   const { course_id, progress_percentage } = payload;
      //   if (course_id) {
      //     state.progressBar[course_id] = progress_percentage;
      //   }
      // }
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
  setProgressBar,
  setActiveCourse,
} = coursesSlice.actions;

// * this is how you retrieve from store

export const selectCourses = (state) => state.courses.courses;
export const selectEnrolledCourses = (state) => state.courses.enrolledCourses;
export const selectModuleContent = (state) => state.courses.moduleContent;
export const selectCourseContent = (state) => state.courses.courseContent;
export const selectMoreInfoContent = (state) => state.courses.moreInfo;
export const selectModuleProgress = (state) => state.courses.moduleProgress;
export const selectProgressBar = (state) => state.courses.progressBar;
export const selectActiveCourse = (state) => state.courses.activeCourse;

export default coursesSlice.reducer;
