import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <Outlet /> {/* This is where nested pages will render */}
      </div>
    </div>
  );
};

export default Layout;
