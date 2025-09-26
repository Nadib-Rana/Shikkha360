import React from 'react';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import AddStudent from '../pages/Students/AddStudent'; // 
import EditSubject from '../pages/Subjects/EditSubject';
import AddSubject from '../pages/Subjects/AddSubject';
import StudentList from '../pages/Students/StudentList';
import Dashboard from '../pages/Dashboard/Dashboard';
import Student from '../pages/Students/Student';
import AdminProfile from '../profile/admin/AdminProfile';
import TeacherList from '../pages/Teachers/TeacherList';
import TeacherProfile from '../pages/Teachers/TeacherProfile';
import Teacher from '../pages/Teachers/Teacher';
import Register from "../pages/Auth/Register";

// Placeholder components

const Settings = () => <div>Settings Page</div>;

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Layout */}
          <Route path='/' element={<Dashboard />} />
          <Route path="/teachers" element={<Teacher />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-student" element={<AddStudent />} /> {/* ✅ Added route */}
          <Route path="/login" element={<Login />} />
          <Route path="/edit" element={<EditSubject />} />
          <Route path="/addsubject" element={<AddSubject />} />
          <Route path="/students" element={<Student />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="/teacherlist" element={<TeacherList />} />
          <Route path="/teacherprofile" element={<TeacherProfile />} />
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/admin/reg" element={<Register />} />
          
        {/* Login route without Layout */}
        
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;