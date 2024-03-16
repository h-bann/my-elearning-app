import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import coursesReducer from "./coursesSlice";
import contactReducer from "./contactSlice";

export const store = configureStore(
  {
    reducer: {
      account: accountReducer,
      courses: coursesReducer,
      contact: contactReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
