
import React from 'react';
import { FaUsers, FaUserTie, FaUserGraduate, FaBook, FaClipboard, FaChartBar, FaMoneyBill, FaCog, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from './Dashboard/Dashboard';
import Header from '../components/layout/Header';

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
<div > 
    <Header /> 
<div className='py-[55px]'>
  <Layout 
  links={menuItems}
   >
   <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1  bg-gray-50">
        <Dashboard />
      </main>
    </div>
    </Layout>
  </div>
 </div>
  );
};

export default AdminDashboard;
