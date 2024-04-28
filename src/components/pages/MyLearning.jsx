import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModuleContent,
  setModuleContent,
  setCourseContent,
  setEnrolledCourses,
  selectEnrolledCourses,
} from "../../redux/coursesSlice";
import Button from "../genericComponents/Button";
import ModuleContent from "../main/ModuleContent";
import axios from "axios";
import { getFromLocal } from "../../storage";
import { url } from "../../config";

const MyLearning = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const moduleContent = useSelector(selectModuleContent);
  const styles = { width: "15rem" };

  useEffect(() => {
    const getEnrolledCourses = async () => {
      const { data } = await axios.get(`${url}/courses/getEnrolledCourses`, {
        headers: { token: getFromLocal("token") },
      });
      dispatch(setEnrolledCourses(data.enrolledCourses));
    };
    getEnrolledCourses();
  }, []);

  const onCourseClick = (item) => {
    dispatch(setModuleContent(item));
    dispatch(setCourseContent(item.modules[0]));
  };

  const leaveCourse = async (item) => {
    const { data } = await axios.delete(
      `${url}/courses/deleteEnrolled/${item.id}`,
      {
        headers: { token: getFromLocal("token") },
      }
    );
    console.log(data);
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
                  <img src={"../../../public/images/" + item.image} />
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
