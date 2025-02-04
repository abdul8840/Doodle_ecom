import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Layout from "./components/Layout";
import Signin from "./pages/Signin";
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route for Signin */}
        <Route path="/admin-signin" element={<Signin />} />

        {/* Protected Routes inside Layout */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Setting />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
