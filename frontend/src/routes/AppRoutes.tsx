import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import TeacherDashboard from "../pages/dashboard/TeacherDashboard";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import UserProfile from "../pages/profile/UserProfile";
import EditProfile from "../pages/profile/EditProfile";
import Dashboard from "../pages/Dashboard";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route element={<ProtectedRoute role="teacher" />}>
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Route>
      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/student" element={<StudentDashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/dashboard" element={<Dashboard />} />    
    </Routes>
  );
};

export default AppRoutes;
