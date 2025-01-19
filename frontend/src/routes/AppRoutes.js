import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MechanicsPage from '../pages/MechanicsPage.js';
import TasksPage from '../pages/TasksPage.js';
import Navbar from '../components/Navbar.js';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/mechanics" element={<MechanicsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;