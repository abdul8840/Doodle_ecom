import { Button } from '@mui/material'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Home from './pages/Home';
import Signin from './pages/Signin';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/sign-in" element={<Signin />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
