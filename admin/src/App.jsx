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
import ColorList from "./pages/ColorList";
import AddColor from "./pages/AddColor";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import ViewOrder from "./pages/ViewOrder";

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
            <Route path="color" element={<ColorList />} />
            <Route path="create-color" element={<AddColor />} />
            <Route path="create-color/:id" element={<AddColor />} />
            <Route path="product" element={<ProductList />} />
            <Route path="create-product" element={<AddProduct />} />
            <Route path="create-product/:id" element={<AddProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<ViewOrder />} />
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Setting />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
