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
        {/* Students */}
        <Route path="/students" element={<ProtectedRoute><Student /></ProtectedRoute>} />
        <Route path="/students/add" element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
        <Route path="/students/list" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
        <Route path="/students/profile/:id" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
        <Route path="/students/assignments" element={<ProtectedRoute><StudentAssignments /></ProtectedRoute>} />
        <Route path="/students/result" element={<ProtectedRoute><StudentResults /></ProtectedRoute>} />
        {/* Subjects */}
        <Route path="/subjects/add" element={<ProtectedRoute><AddSubject /></ProtectedRoute>} />
        <Route path="/subjects/edit/:id" element={<ProtectedRoute><EditSubject /></ProtectedRoute>} />
        {/* Teachers */}
        <Route path="/teachers" element={<ProtectedRoute><Teacher /></ProtectedRoute>} />
        <Route path="/teachers/list" element={<ProtectedRoute><TeacherList /></ProtectedRoute>} />
        <Route path="/teachers/profile/:id" element={<ProtectedRoute><TeacherProfile /></ProtectedRoute>} />
        <Route path="/teachers/assignments" element={<ProtectedRoute><TeacherAssignments /></ProtectedRoute>} />
        <Route path="/teachers/assign-subjects" element={<ProtectedRoute><AssignSubjects /></ProtectedRoute>} />
        <Route path="/teachers/result" element={<ProtectedRoute><TeacherResults /></ProtectedRoute>} />
        {/* Admin */}
        <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
        {/* Student Profile Assignments */}
        <Route path="/profile/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
        {/* Admin Dashboard and subpages */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><div>Manage Users Page</div></ProtectedRoute>} />
        <Route path="/admin/teachers" element={<ProtectedRoute><div>Teachers Management Page</div></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute><div>Students Management Page</div></ProtectedRoute>} />
        <Route path="/admin/subjects" element={<ProtectedRoute><div>Subjects Management Page</div></ProtectedRoute>} />
        <Route path="/admin/assignments" element={<ProtectedRoute><div>Assignments Management Page</div></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute><div>Reports Page</div></ProtectedRoute>} />
        <Route path="/admin/fees" element={<ProtectedRoute><div>Fees & Payments Page</div></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><div>Settings Page</div></ProtectedRoute>} />
        {/* Other dashboards */}
        <Route path="/parent" element={<ProtectedRoute><ParentDashboard /></ProtectedRoute>} />
        <Route path="/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/teacher" element={<ProtectedRoute><TeacherProfile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;