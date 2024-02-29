import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";

export const store = configureStore(
  {
    reducer: {
      login: loginReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
