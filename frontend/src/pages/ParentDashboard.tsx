
import React from 'react';
import { FaUserGraduate, FaChartLine, FaClipboard, FaComments, FaMoneyBill, FaUserCog, FaHome, FaCalendar } from 'react-icons/fa';
import Layout from '../components/layout/Layout';

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
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Parent Dashboard</h1>
        <p className="mb-6">Welcome, Parent! Here you can view your child's progress, attendance, assignments, communicate with teachers, and manage payments.</p>
        {/* Add main dashboard widgets or summary here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">Children Overview</h2>
            <p>See your children's profiles and academic status.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">Recent Messages</h2>
            <p>Check latest communications from teachers and school.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">Upcoming Assignments</h2>
            <p>Track assignments and deadlines for your children.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">Fee Status</h2>
            <p>View and manage school fees and payments.</p>
          </div>
        </div>
      </main>
    </div>
    </Layout>
  );
};

export default ParentDashboard;
