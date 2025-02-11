import { Button } from '@mui/material'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Header from './components/Header/Header';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Wishlist from './pages/Wishlist';
import ProductDetails from './pages/ProductDetails';
import OurStore from './pages/OurStore';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Address from './pages/Address';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/our-store" element={<OurStore />} />


        <Route element={<PrivateRoute />}>
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<Orders />} />
          <Route path="/create-address" element={<Address />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
