import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import coursesReducer from "./coursesSlice";
import basketReducer from "./basketSlice";

export const store = configureStore(
  {
    reducer: {
      account: accountReducer,
      courses: coursesReducer,
      basket: basketReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
