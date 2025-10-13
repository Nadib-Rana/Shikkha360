
import Layout from '../../components/layout/Layout';
import StatsCards from '../Dashboard/AdminDashboard';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaBook,
  FaClipboard,
  FaCalendarAlt,
  FaChartLine,
  FaComments,
  FaMoneyBill,
} from "react-icons/fa";
  const menuItems = [
    { path: "/student/dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/student/profile", label: "Profile", icon: <FaUser /> },
    { path: "/student/courses", label: "Courses", icon: <FaBook /> },
    { path: "/student/assignments", label: "Assignments", icon: <FaClipboard /> },
    { path: "/student/exams", label: "Exams & Results", icon: <FaCalendarAlt /> },
    { path: "/student/attendance", label: "Attendance", icon: <FaChartLine /> },
    { path: "/student/messages", label: "Messages", icon: <FaComments /> },
    { path: "/student/fees", label: "Fees & Payments", icon: <FaMoneyBill /> },
  ];

function Dashboard() {
  return (
   <>
   <div className="w-64 h-screen bg-blue-900 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4 border-b border-blue-700">
        Student Panel
      </h2>
      <nav className="flex flex-col gap-1 p-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 p-2 rounded transition ${
              location.pathname === item.path
                ? "bg-blue-700 font-semibold"
                : "hover:bg-blue-700"
            }`}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
    </div>
    </>
  );
}

export default Dashboard;