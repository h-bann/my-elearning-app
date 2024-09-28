import React, { useState, useEffect } from "react";
import { selectCourses, setCourses } from "../../redux/coursesSlice";
import {
  setBasketItems,
  selectBasketCount,
  selectBasketItems,
  selectBasketError,
} from "../../redux/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../genericComponents/Button";
import axios from "axios";
import {
  getFromLocal,
  storeManyInLocal,
  storeSingleInLocal,
} from "../../storage";
import { url } from "../../config";
import "../pages/courses.scss";

const Courses = () => {
  const dispatch = useDispatch();
  const [tempState, setTempState] = useState(false);
  const [infoState, setInfoState] = useState();
  const [modulesContent, setModulesContent] = useState(false);
  const courses = useSelector(selectCourses);
  const basketCount = useSelector(selectBasketCount);
  const basketItems = useSelector(selectBasketItems);
  const basketError = useSelector(selectBasketError);
  // const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    if (courses.length === 0) {
      const getCourses = async () => {
        const { data } = await axios.get(`${url}/courses/getCourses`, {
          headers: { token: getFromLocal("token") },
        });
        dispatch(setCourses(data.courses));
      };
      getCourses();
    }
  }, []);
  const onCourseClick = async (item) => {
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
  };

  if (!courses) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (basketError) {
    alert("Item already in basket");
  }

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
        </div>
      )}

      {/* {modulesContent && <div> {<ModulesContainer />}</div>} */}
    </>
  );
};

export default Courses;
