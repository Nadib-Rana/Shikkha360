
import React from 'react';
import { FaUsers, FaUserTie, FaUserGraduate, FaBook, FaClipboard, FaChartBar, FaMoneyBill, FaCog, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from './Dashboard/Dashboard';

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
  <div className='flex justify-between border-b-1'>
  <h2 className='text-3xl font-bold text-gray-700 text-center'>Admin Name</h2>
  <div className='flex justify-between'>
    <ul className='m-1 text-left'> 
      <li className='text-xl font-bold text-gray-500'>UserName</li>
      <li className='text-sm font-mono'>UserID:213002247</li>
     </ul>
     <img 
     src="https://avatars.githubusercontent.com/u/169526577?v=4"
     alt="ProfileImg"
     className='max-w-[50px] max-h-[50px] border-2 border-gray-700 rounded-[50%] p-0.5 m-1'
     />
  </div>
  </div>  
  <Layout links={menuItems} >
   <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <Dashboard />
      </main>
    </div>
    </Layout>
  </div>
  );
};

export default AdminDashboard;
