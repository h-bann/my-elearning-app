import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCourses, setCourses } from "../../redux/coursesSlice";
import {
  setBasketItems,
  selectBasketError,
  setBasketError,
  selectBasketCount,
} from "../../redux/basketSlice";
import Button from "../genericComponents/Button";
import axios from "axios";
import { getFromLocal } from "../../storage";
import { url } from "../../config";
import "../pages/courses.scss";
import toast, { Toaster } from "react-hot-toast";

const Courses = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const courses = useSelector(selectCourses);
  const basketError = useSelector(selectBasketError);
  const basketCount = useSelector(selectBasketCount);

  useEffect(() => {
    if (courses.length === 0) {
      const getCourses = async () => {
        const { data } = await axios.get(`${url}/courses/getCourses`, {
          headers: { token: getFromLocal("token") },
        });
        dispatch(setCourses(data.courses));
        setIsLoading(false);
      };
      getCourses();
    }
  }, [courses.length, dispatch]);

  useEffect(() => {
    if (basketError) {
      toast.error("Already in basket!");
      dispatch(setBasketError(false));
    }
  }, [basketError, dispatch]);

  useEffect(() => {
    if (basketCount) {
      toast.success("Added to basket!");
    }
  }, [basketCount]);

  const onCourseClick = useCallback(
    async (item) => {
      dispatch(setBasketItems([item, 1]));

      // records enrolled course against user's account
      const { data: enrolledCourse } = await axios.patch(
        `${url}/courses/enrolled`,
        {
          course_title: item.course_title,
          course_id: item.id,
          image: item.image,
        },
        {
          headers: { token: getFromLocal("token") },
        }
      );

      // ! ADD MESSAGE SAYING CAN'T ENROL IF NOT LOGGED IN
    },
    [dispatch]
  );

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="main-container">
        <h3 className="">Available Courses</h3>
        <div className="card-container">
          {courses.map((item) => {
            return (
              <div className="card course-card" key={item.id}>
                <img src={"./images/" + item.image} />
                <div className="card-body">
                  <h4 className="card-title">{item.course_title}</h4>
                  <div className="card-text text-wrap">{item.more_info}</div>
                  <Button
                    className={["btn-primary"]}
                    text="Buy course"
                    onClick={() => onCourseClick(item)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Toaster />;
      </div>
    </>
  );
};

export default React.memo(Courses);
