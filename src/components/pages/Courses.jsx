import React, { useState, useEffect } from "react";
import {
  selectCourses,
  setCourses,
  setActiveCourse,
} from "../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import ModuleContent from "../main/ModuleContent";
import Button from "../genericComponents/Button";
import axios from "axios";
import { getFromLocal } from "../../storage";
import { url } from "../../config";
import "../pages/courses.scss";

const Courses = () => {
  const dispatch = useDispatch();
  const [tempState, setTempState] = useState(false);
  const [infoState, setInfoState] = useState();
  const [modulesContent, setModulesContent] = useState(false);
  const courses = useSelector(selectCourses);

  useEffect(() => {
    if (courses.length === 0) {
      const getCourses = async () => {
        const { data } = await axios.get(`${url}/courses/getCourses`, {
          headers: { token: getFromLocal("token") },
        });
        dispatch(setCourses(data.courses));
        console.log(data);
      };
      getCourses();
    }
  }, []);

  const onCourseClick = async (item) => {
    setModulesContent(true);
    dispatch(setActiveCourse(item.id));

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
  };

  if (!courses) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  const setInfo = (clickedItem) => {
    courses.map((item) => {
      if (item.id === clickedItem.id) {
        setInfoState(clickedItem);
      }
    });
    // infoState ? setInfoState(!null) : setInfoState(item);
    setTempState(!tempState);
  };

  return (
    <>
      {!modulesContent && (
        <div className="main-container">
          <h3 className="">Available Courses</h3>
          <div className="card-container">
            {courses.map((item) => {
              return (
                <div className="card course-card" key={item.id}>
                  <img src={"./images/" + item.image} />
                  <div className="card-body">
                    <h4 className="card-title">{item.course_title}</h4>
                    <Button
                      className={["btn-primary"]}
                      text="Buy course"
                      onClick={() => onCourseClick(item)}
                    />
                    <Button
                      className={
                        infoState && infoState.id === item.id
                          ? ["btn-outline-secondary"]
                          : ["btn-outline-primary", ""]
                      }
                      text="More Info"
                      // onClick={() => setInfoState(item)}
                      onClick={() => setInfo(item)}
                    />
                    {/* {infoState && infoState.id === item.id && (
                      <div className="card-text text-wrap">
                        {infoState.more_info}
                      </div>
                    )} */}
                    {tempState && infoState.id === item.id && (
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

      {modulesContent && <div> {<ModuleContent />}</div>}
    </>
  );
};

export default Courses;
