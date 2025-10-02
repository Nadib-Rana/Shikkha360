import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

import Dashboard from '../pages/Dashboard/Dashboard';


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

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />
        

        {/* Students */}
        <Route path="/students" element={<Student />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/list" element={<StudentList />} />
        <Route path="/students/profile/:id" element={<StudentProfile />} />
        <Route path="/students/assignments" element={<StudentAssignments />} />
        <Route path="/students/result" element={<StudentResults />} />


        {/* Subjects */}
        <Route path="/subjects/add" element={<AddSubject />} />
        <Route path="/subjects/edit/:id" element={<EditSubject />} />

        {/* Teachers */}
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/teachers/list" element={<TeacherList />} />
        <Route path="/teachers/profile/:id" element={<TeacherProfile />} />
        <Route path="/teachers/assignments" element={<TeacherAssignments />} />
        <Route path="/teachers/assign-subjects" element={<AssignSubjects />} />
        <Route path="/teachers/result" element={<TeacherResults />} />

        {/* Admin */}
        <Route path="/admin/profile" element={<AdminProfile />} />

        {/* Student Profile Assignments */}
        <Route path="/profile/assignments" element={<Assignments />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;