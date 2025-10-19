
import React from 'react';
import { FaUserGraduate, FaClipboard, FaComments, FaMoneyBill, FaUserCog, FaHome, FaCalendar } from 'react-icons/fa';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard/ParentDashboard';

const menuItems = [
  { path: '/parent/dashboard', label: "Dashboard", icon: <FaHome /> },
  { path: '/parent/children', label: "My Children", icon: <FaUserGraduate /> },
  { path: '/parent/children/exam', label: "Exam", icon: <FaCalendar /> },
  { path: '/parent/children/result', label: "Result", icon: <FaUserGraduate /> },
  { path: '/parent/children/attendance', label: "Attendance", icon: <FaClipboard /> },
  { path: '/parent/children/assignments', label: "Assignments", icon: <FaClipboard /> },
  { path: '/parent/messages', label: "Messages", icon: <FaComments /> },
  { path: '/parent/children/fees', label: "Fees & Payments", icon: <FaMoneyBill /> },
  { path: '/parent/profile', label: "Profile/Settings", icon: <FaUserCog /> },
];

const ParentDashboard: React.FC = () => {
  return (
    <Layout links={menuItems} >
    <div>
      <Dashboard />
    </div>
    </Layout>
  );
};

export default ParentDashboard;
