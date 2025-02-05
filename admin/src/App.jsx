import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Layout from "./components/Layout";
import Signin from "./pages/Signin";
import PrivateRoutes from "./components/PrivateRoutes";
import GetAllUsers from "./pages/GetAllUsers";
import ProductCategoryList from "./pages/ProductCategoryList";
import ProductCategoryCreate from "./pages/ProductCategoryCreate";
import UpdateProductCategory from "./pages/UpdateProductCategory";
import Addbrand from "./pages/AddBrand";
import BrandList from "./pages/BrandList";

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
            <Route path="all-users" element={<GetAllUsers />} />
            <Route path="product-category" element={<ProductCategoryList />} />
            <Route path="create-product-category" element={<ProductCategoryCreate />} />
            <Route path="update-product-category/:id" element={<UpdateProductCategory />} />
            <Route path="create-brand" element={<Addbrand />} />
            <Route path="create-brand/:id" element={<Addbrand />} />
            <Route path="get-brand" element={<BrandList />} />
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Setting />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
