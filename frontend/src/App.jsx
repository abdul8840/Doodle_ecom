import { Button } from '@mui/material'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Header from './components/Header/Header';
import Profile from './pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/my-profile" element={<Profile />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
