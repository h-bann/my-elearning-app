import React, { useState, useEffect } from "react";
import {
  selectCourses,
  setCourses,
  selectModuleContent,
  setModuleContent,
  setCourseContent,
  setEnrolledCourses,
} from "../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import ModuleContent from "../main/ModuleContent";
import Button from "../genericComponents/Button";
import axios from "axios";
import { selectLoginState } from "../../redux/accountSlice";
import { getFromLocal } from "../../storage";
import { url } from "../../config";

const Courses = () => {
  const [infoState, setInfoState] = useState();
  const courses = useSelector(selectCourses);
  const moduleContent = useSelector(selectModuleContent);
  const loginState = useSelector(selectLoginState);
  const dispatch = useDispatch();

  const styles = { width: "15rem" };

  useEffect(() => {
    const getCourses = async () => {
      const { data } = await axios.get(`${url}/courses`);
      dispatch(setCourses(data.courses));
    };
    getCourses();
  }, []);

  const getEnrolledCourses = async () => {
    const { data } = await axios.get(`${url}/courses/getEnrolledCourses`, {
      headers: { token: getFromLocal("token") },
    });
    dispatch(setEnrolledCourses(data.enrolledCourses));
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [moduleContent]);

  const onCourseClick = async (item) => {
    if (loginState) {
      try {
        // get's modules and content from database
        const { data: courseContent } = await axios.get(
          `${url}/courses/getCourse/${item.id}`,
          {
            headers: { token: getFromLocal("token") },
          }
        );
        dispatch(setModuleContent(courseContent.course.modules));
        dispatch(setCourseContent(courseContent.course.modules[0].content));

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
        const { data: progress } = await axios.patch(
          `${url}/courses/courseProgress`,
          {
            moduleId: courseContent.course.modules[0].id,
            courseId: item.id,
          },
          {
            headers: { token: getFromLocal("token") },
          }
        );
      } catch (error) {
        console.error("Error", error);
      }
    }

    // ! ADD MESSAGE SAYING CAN'T ENROL IF NOT LOGGED IN
  };

  if (!courses) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {!moduleContent && (
        <div className="w-100 m-auto ">
          <h3 className="m-4">Available Courses</h3>
          <div className="w-100 d-flex flex-wrap justify-content-start m-4 ">
            {courses.map((item) => {
              return (
                <div
                  className="card m-2 course-card"
                  style={styles}
                  key={item.id}
                >
                  <img src={"./images/" + item.image} />
                  <div className="card-body">
                    <h4 className="card-title">{item.course_title}</h4>
                    <Button
                      className={["btn-primary", "me-2", "my-2"]}
                      text="Enrol"
                      onClick={() => onCourseClick(item)}
                    />
                    <Button
                      className={["btn-outline-primary", ""]}
                      text="More Info"
                      onClick={() => setInfoState(item)}
                    />
                    {infoState && infoState.id === item.id && (
                      <div className="card-text text-wrap">
                        {infoState.more_info}
                      </div>
                    )}
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

export default Courses;
