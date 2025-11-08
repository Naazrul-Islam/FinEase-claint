import React from "react";
import { Outlet } from "react-router";
// import Footer from "../components/Footer";
import Navber from "../components/Navber";
const AuthLayout = () => {
  return (
    <div className="bg-gray-300 h-fit max-w-10/12 mx-auto">
      <Navber></Navber>
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default AuthLayout;
