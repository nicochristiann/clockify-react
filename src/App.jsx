import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
