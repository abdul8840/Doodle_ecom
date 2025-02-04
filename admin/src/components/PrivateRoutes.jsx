import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState; // Get user state

  return user ? <Outlet /> : <Navigate to="/admin-signin" replace />;
};

export default PrivateRoutes;
