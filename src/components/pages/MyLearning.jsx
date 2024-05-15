import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModuleContent,
  setCourses,
  setModuleContent,
  setCourseContent,
  setEnrolledCourses,
  selectEnrolledCourses,
  selectCourses,
} from "../../redux/coursesSlice";
import Button from "../genericComponents/Button";
import ModuleContent from "../main/ModuleContent";
import axios from "axios";
import { getFromLocal } from "../../storage";
import { url } from "../../config";
import { selectLoginState } from "../../redux/accountSlice";

const MyLearning = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleContent = useSelector(selectModuleContent);
  const loginState = useSelector(selectLoginState);

  const styles = { width: "15rem" };

  const getEnrolledCourses = async () => {
    const { data } = await axios.get(`${url}/courses/getEnrolledCourses`, {
      headers: { token: getFromLocal("token") },
    });
    dispatch(setEnrolledCourses(data.enrolledCourses));
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      const { data } = await axios.get(`${url}/courses`);
      dispatch(setCourses(data.courses));
    };
    getCourses();
  }, []);

  //

  const onCourseClick = async (item) => {
    if (loginState) {
      // get's modules and content from database
      const { data: courseContent } = await axios.get(
        `${url}/courses/getCourse/${item.id}`,
        {
          headers: { token: getFromLocal("token") },
        }
      );
      dispatch(setModuleContent(courseContent.course.modules));
      dispatch(setCourseContent(courseContent.course.modules[0].content));
    }
  };

  const leaveCourse = async (item) => {
    await axios.delete(`${url}/courses/deleteEnrolled/${item.id}`, {
      headers: { token: getFromLocal("token") },
    });
    getEnrolledCourses();
  };

  if (!enrolledCourses || !enrolledCourses.length) {
    return (
      <div className="w-100 m-auto">
        <h3 className="m-4">Enrolled Courses</h3>
        <p className="m-4">You haven't enrolled on any courses yet.</p>
      </div>
    );
  }

  return (
    <>
      {!moduleContent && (
        <div className="w-100 m-auto ">
          <h3 className="m-4">Enrolled Courses</h3>
          <div className="w-100 d-flex flex-wrap justify-content-start m-4 ">
            {enrolledCourses.map((item) => {
              return (
                <div
                  className="card m-2 course-card"
                  style={styles}
                  key={item.id}
                >
                  <img src={"./images/" + item.image} />
                  <div className="card-body">
                    <h4 className="card-title">{item.title}</h4>
                    <Button
                      className={["btn-primary", "me-2", "my-2"]}
                      text="Continue"
                      onClick={() => onCourseClick(item)}
                    />
                    <Button
                      className={["btn-outline-primary", ""]}
                      text="Leave course"
                      onClick={() => leaveCourse(item)}
                      π
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {moduleContent !== null && <div> {<ModuleContent />}</div>}
    </>
  );
};

export default MyLearning;
