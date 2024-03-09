import React from "react";
import database from "../../courseContent.json";
import { useSelector } from "react-redux";
import {
  selectCoursesScreen,
  selectModulesScreen,
} from "../../redux/coursesSlice";

const Module = () => {
  const coursesScreen = useSelector(selectCoursesScreen);
  const modulesScreen = useSelector(selectModulesScreen);

  const data = [...database];
  const filteredCourses = data.find((item) => {
    if (coursesScreen === item.id) {
      const { modules } = data[item.id];

      const filteredModules = modules.find((newItem) => {
        if (modulesScreen === newItem.id) {
        }
      });
    }
  });

  // console.log(filteredCourses);

  //     const filteredThings = modules.filter(
  //     (thing) => thing.id === modulesScreen
  //   );
  //   return filteredThings.map((thing) => thing.content);
  // }
  // return;
  // when user clicks on module, set module screen to that module
  // this code reads what the moduleScreen is and returns filtered module based on it

  return (
    <>
      <li></li>
    </>
  );
};

export default Module;
