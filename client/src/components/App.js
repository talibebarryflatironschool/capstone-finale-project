import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Workouts from '../pages/Workouts';
import Skills from '../pages/Skills';
import Nutrition from '../pages/Nutrition';
import { UserProvider } from '../context/UserContext'


function App() {
  return (
    <Router>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/nutrition" element={<Nutrition />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
