import React from "react";
import { useSelector } from "react-redux";
import { selectLoginState, selectScreen } from "../../redux/accountSlice";

const Homepage = () => {
  const screen = useSelector(selectScreen);
  const loginState = useSelector(selectLoginState);

  return (
    <>
      <p> THIS IS WHERE A LITTLE SPIEL WILL GO </p>
    </>
  );
};

export default Homepage;
