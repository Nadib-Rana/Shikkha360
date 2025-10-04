import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

import RoleDashboard from '../pages/RoleDashboard';

import AddStudent from '../pages/Students/AddStudent';
import StudentList from '../pages/Students/StudentList';
import StudentProfile from '../pages/Students/StudentProfile';
import StudentAssignments from '../pages/Students/StudentAssignments';
import Student from '../pages/Students/Student';
import StudentResults from '../pages/Students/StudentResults';

import AddSubject from '../pages/Subjects/AddSubject';
import EditSubject from '../pages/Subjects/EditSubject';

import TeacherList from '../pages/Teachers/TeacherList';
import TeacherProfile from '../pages/Teachers/TeacherProfile';
import TeacherAssignments from '../pages/Teachers/TeacherAssignments';
import AssignSubjects from '../pages/Teachers/AssignSubjects';
import Teacher from '../pages/Teachers/Teacher';
import TeacherResults from '../pages/Teachers/TeacherResults ';

import AdminProfile from '../profile/admin/AdminProfile';
import Assignments from '../profile/student/Assignments';
import AdminDashboard from '../pages/AdminDashboard';
import ParentDashboard from '../pages/ParentDashboard';
import StudentDashboard from '../pages/Students/Dashboard';
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