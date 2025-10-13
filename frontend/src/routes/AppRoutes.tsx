import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

import RoleDashboard from '../pages/RoleDashboard';


import Assignments from '../profile/student/Assignments';;
import ProtectedRoute from '../components/layout/ProtectedRoute';

import AdminRoutes from './AdminRoutes';
import TeacherRoutes from './TeacherRoutes';
import StudentRoutes from './StudentRoutes';
import ParentRoutes from './ParentRoutes';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <RoleDashboard />
          </ProtectedRoute>
        } />
        {/* Admin Routes */}
        {AdminRoutes}
        {/* Teacher Routes */}
        {TeacherRoutes}
        {/* Student Routes */}
        {StudentRoutes}
        {/* Parent Routes */}
        {ParentRoutes}
        {/* Miscellaneous */}
        <Route path="/profile/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;