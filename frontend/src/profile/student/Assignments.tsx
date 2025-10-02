import React from 'react';
import Layout from '../../components/layout/Layout';
import StudentAssignments from '../../pages/Students/StudentAssignments';
import {
  FaBook,
  FaCalendarAlt,
  FaChartLine,
  FaClipboard,
  FaComments,
  FaHome,
  FaMoneyBill,
  FaUser,
} from 'react-icons/fa';

const studentSidebar = [
  { path: '/student/dashboard', label: 'Dashboard', icon: <FaHome /> },
  { path: '/student/profile', label: 'Profile', icon: <FaUser /> },
  { path: '/student/courses', label: 'Courses', icon: <FaBook /> },
  { path: '/student/assignments', label: 'Assignments', icon: <FaClipboard /> },
  { path: '/student/exams', label: 'Exams & Results', icon: <FaCalendarAlt /> },
  { path: '/student/attendance', label: 'Attendance', icon: <FaChartLine /> },
  { path: '/students/result', label: 'Result', icon: <FaChartLine /> },
  { path: '/student/messages', label: 'Messages', icon: <FaComments /> },
  { path: '/student/fees', label: 'Fees & Payments', icon: <FaMoneyBill /> },
];

const Assignments: React.FC = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between border py-3 px-4 bg-white shadow-sm">
        <h2 className="text-2xl font-bold text-blue-600 tracking-wide">Shikka360</h2>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">User Name</p>
            <p className="text-xs text-gray-500">User Role</p>
          </div>
          <img
            className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwrIZNXdOFANSt66E6sjQcp0WfejBISj90Vw&s"
            alt="Profile"
          />
        </div>
      </div>

      {/* Sidebar Layout with Assignments */}
      <Layout links={studentSidebar}>
        <StudentAssignments />
      </Layout>
    </>
  );
};

export default Assignments;