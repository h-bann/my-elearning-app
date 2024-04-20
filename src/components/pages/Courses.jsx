import React, { useState, useEffect } from "react";
import {
  selectCourses,
  setCourses,
  selectModuleContent,
  setModuleContent,
  setCourseContent,
} from "../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import ModuleContent from "../main/ModuleContent";
import Button from "../genericComponents/Button";
import axios from "axios";
import { selectLoginState } from "../../redux/accountSlice";
import { getFromLocal } from "../../storage";
import { info } from "sass";

const Courses = () => {
  const [infoState, setInfoState] = useState();
  const courses = useSelector(selectCourses);
  const moduleContent = useSelector(selectModuleContent);
  const loginState = useSelector(selectLoginState);
  const dispatch = useDispatch();

  const styles = { width: "15rem" };

  useEffect(() => {
    const getCourses = async () => {
      const { data } = await axios.get(`http://localhost:6001/courses`);
      dispatch(setCourses(data.courses));
      console.log(data);
    };
    getCourses();
  }, []);

  const onCourseClick = async (item) => {
    if (loginState) {
      // records enrolled course against user's account
      // dispatch(setModuleContent(item));
      // dispatch(setCourseContent(item.modules[0].moduleContent));
      const { data } = await axios.patch(
        `http://localhost:6001/courses/enrolled`,
        item.title,
        {
          headers: { token: getFromLocal("token") },
        }
      );
      console.log(data);

      // get's modules and content from database
      const { courseContent } = await axios.get(
        `http://localhost:6001/courses/${item.id}`
      );
      console.log(courseContent);
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
                  <img src={"../../../public/images/" + item.image} />
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
