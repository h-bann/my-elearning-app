import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModuleContent,
  setModuleContent,
  setCourseContent,
  setCourses,
  selectCourses,
} from "../../redux/coursesSlice";
import Button from "../genericComponents/Button";
import ModuleContent from "../main/ModuleContent";
import { selectUserId } from "../../redux/accountSlice";
import axios from "axios";

const MyLearning = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const moduleContent = useSelector(selectModuleContent);
  const userId = useSelector(selectUserId);
  const styles = { width: "15rem" };

  const getEnrolledCourses = async () => {
    const { data } = await axios.get(`http://localhost:6001/users/${userId}`);
    const { enrolledCourses } = data.user;
    dispatch(setCourses(enrolledCourses));
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [userId]);

  const onCourseClick = (item) => {
    dispatch(setModuleContent(item));
    dispatch(setCourseContent(item.modules[0]));
  };

  const leaveCourse = async (item) => {
    const { data } = await axios.delete(
      `http://localhost:6001/courses/enrolled/${userId}/${item.id}`
    );
    getEnrolledCourses();
    console.log(data);
  };

  if (!courses || !courses.length) {
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
            {courses.map((item) => {
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
