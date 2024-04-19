import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginState } from "../../redux/accountSlice";
import { setModuleContent, setCourseContent } from "../../redux/coursesSlice";
import { Link } from "react-router-dom";

const Navigation = () => {
  const loginState = useSelector(selectLoginState);
  const dispatch = useDispatch();

  return (
    <>
      <Link className="link" to="/homepage">
        Home
      </Link>
      <Link
        className="link"
        to="/courses"
        onClick={() => {
          dispatch(setModuleContent(null));
          dispatch(setCourseContent(null));
        }}
      >
        Courses
      </Link>
      {/* // * if user is logged in, display My Learning in nav */}
      {loginState && (
        <Link
          className="link"
          to="/myLearning"
          onClick={() => {
            dispatch(setModuleContent(null));
            dispatch(setCourseContent(null));
          }}
        >
          My Learning
        </Link>
      )}
      <Link className="link" to="/contact">
        Contact
      </Link>
    </>
  );
};

export default Navigation;
