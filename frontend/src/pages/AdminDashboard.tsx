
import React from 'react';
import { FaUsers, FaUserTie, FaUserGraduate, FaBook, FaClipboard, FaChartBar, FaMoneyBill, FaCog, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const menuItems = [
  { path: '/admin', label: "Dashboard", icon: <FaHome /> },
  { path: '/admin/users', label: "Manage Users", icon: <FaUsers /> },
  { path: '/admin/teachers', label: "Teachers", icon: <FaUserTie /> },
  { path: '/admin/students', label: "Students", icon: <FaUserGraduate /> },
  { path: '/admin/subjects', label: "Subjects", icon: <FaBook /> },
  { path: '/admin/assignments', label: "Assignments", icon: <FaClipboard /> },
  { path: '/admin/reports', label: "Reports", icon: <FaChartBar /> },
  { path: '/admin/fees', label: "Fees & Payments", icon: <FaMoneyBill /> },
  { path: '/admin/settings', label: "Settings", icon: <FaCog /> },
];

const AdminDashboard: React.FC = () => {
  return (

    
  <Layout links={menuItems}  >
   <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-6">Welcome, Admin! Here you can manage users, teachers, students, subjects, assignments, view reports, and configure system settings.</p>
        {/* Add main dashboard widgets or summary here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">User Management</h2>
            <p>Manage all users, assign roles, and control access.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">Reports & Analytics</h2>
            <p>View system usage, performance, and academic reports.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">Fee Management</h2>
            <p>Monitor and manage school fees and payments.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">System Settings</h2>
            <p>Configure system preferences and security settings.</p>
          </div>
        </div>
      </main>
    </div>
    </Layout>
  );
};

export default AdminDashboard;
