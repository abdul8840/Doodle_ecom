import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Setting from './pages/Setting';
import Layout from './components/Layout';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/settings" element={<Setting />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
