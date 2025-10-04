import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import StudentDashboard from './Students/Dashboard';
import TeacherProfile from './Teachers/TeacherProfile';
import AdminDashboard from './AdminDashboard';
import ParentDashboard from './ParentDashboard';

const RoleDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <div>Please log in to view your dashboard.</div>;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'teacher':
      return <TeacherProfile />;
    case 'student':
      return <StudentDashboard />;
    case 'parent':
      return <ParentDashboard />;
    default:
      return <div>Unknown role.</div>;
  }
};

export default RoleDashboard;
