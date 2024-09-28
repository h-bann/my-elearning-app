import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
// import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/custom.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Error from "./components/pages/Error.jsx";
import Courses from "./components/pages/Courses.jsx";
import Contact from "./components/pages/Contact.jsx";
import MyLearning from "./components/pages/MyLearning.jsx";
import UserAccount from "./components/pages/UserAccount.jsx";
import LoginSignup from "./components/pages/LoginSignup.jsx";
import Homepage from "./components/pages/Homepage.jsx";
import ModulesContainer from "./components/Content/ModulesContainer.jsx";
import Basket from "./components/pages/Basket.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "courses", element: <Courses /> },
      { path: "contact", element: <Contact /> },
      { path: "my-learning", element: <MyLearning /> },
      { path: "content", element: <ModulesContainer /> },
      { path: "my-account", element: <UserAccount /> },
      { path: "basket", element: <Basket /> },
      { path: "login-signup", element: <LoginSignup /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
