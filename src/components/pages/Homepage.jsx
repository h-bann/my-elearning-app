import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEnrolledCourses, setProgressBar } from "../../redux/coursesSlice";
import axios from "axios";
import { getFromLocal } from "../../storage";
import { url } from "../../config";

const Homepage = () => {
  const dispatch = useDispatch();
  const loggedIn = getFromLocal("token");

  if (loggedIn) {
    const getEnrolledCourses = async () => {
      const { data } = await axios.get(`${url}/courses/getEnrolledCourses`, {
        headers: { token: getFromLocal("token") },
      });
      dispatch(setEnrolledCourses(data.enrolledCourses));
    };

    const getModuleProgress = async () => {
      const { data: progressBar } = await axios.get(
        `${url}/courses/progressBar`,
        {
          headers: { token: getFromLocal("token") },
        }
      );

      if (progressBar.code) {
        dispatch(setProgressBar(progressBar.message));
      }
    };

    useEffect(() => {
      getEnrolledCourses();
      getModuleProgress();
    }, [loggedIn]);
  }
  return (
    <div className="container-lg text-center">
      <p> This is the homepage for the e-learning platform.</p>
    </div>
  );
};

export default Homepage;
