import React from "react";
import { useDispatch } from "react-redux";
import Interface from "./components/Interface";

const App = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Interface />
    </>
  );
};

export default App;
