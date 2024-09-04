import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import coursesReducer from "./coursesSlice";

export const store = configureStore(
  {
    reducer: {
      account: accountReducer,
      courses: coursesReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
