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
    const getCourses = async () => {
      if (courses.length === 0) {
        try {
          const { data } = await axios.get(`${url}/courses/getCourses`, {
            headers: { token: getFromLocal("token") },
          });
          dispatch(setCourses(data.courses));
        } catch (error) {
          console.error("Failed to fetch courses:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    getCourses();
  }, [courses.length, dispatch]);

  const onCourseClick = useCallback(async (item) => {
    // dispatch action to update basket items
    dispatch(setBasketItems([item, 1]));

    // records enrolled course against user's account
    // try {
    //   const { data: enrolledCourse } = await axios.patch(
    //     `${url}/courses/enrolled`,
    //     {
    //       course_title: item.course_title,
    //       course_id: item.id,
    //       image: item.image,
    //     },
    //     {
    //       headers: { token: getFromLocal("token") },
    //     }
    //   );
    //   // returns success message from backend
    //   console.log(enrolledCourse);
    // } catch (error) {
    //   console.error("Error enrolling in course:", error);
    // }
  }, []);

  useEffect(() => {
    if (basketError) {
      toast.error("Already in basket!");
      dispatch(setBasketError(null));
    }
  }, [basketError, dispatch]);

  useEffect(() => {
    if (basketError === false) {
      toast.success("Added to basket!");
      dispatch(setBasketError(null));
    }
  }, [basketCount]);

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
                    text="Add to basket"
                    onClick={() => onCourseClick(item)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default React.memo(Courses);
