import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaUserFriends,
  FaBookOpen,
  FaUniversity,
  FaRegBuilding,
  FaClipboardList,
  FaLaptop,
  FaBusAlt,
  FaFileInvoiceDollar,
  FaRegCalendarAlt,
  FaMedkit,
  FaBell,
  FaUsersCog,
} from "react-icons/fa";

interface StatCard {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  path: string; // 👈 route path
}

interface StatSection {
  id: number;
  sectionTitle: string;
  stats: StatCard[];
}

const sections: StatSection[] = [
  {
    id: 1,
    sectionTitle: "🎓 Academics",
    stats: [
      { id: 1, title: "Total Students", value: "1,250", icon: <FaUserGraduate />, color: "text-blue-600", path: "/total-student" },
      { id: 2, title: "Total Teachers", value: "85", icon: <FaChalkboardTeacher />, color: "text-green-600", path: "/total-teacher" },
      { id: 3, title: "Total Parents", value: "1,200", icon: <FaUserFriends />, color: "text-pink-600", path: "/total-parents" },
      { id: 4, title: "Total Classes", value: "40", icon: <FaUniversity />, color: "text-indigo-600", path: "/total-classes" },
      { id: 5, title: "Total Subjects", value: "65", icon: <FaBookOpen />, color: "text-orange-600", path: "/total-subjects" },
      { id: 6, title: "Exams Scheduled", value: "12", icon: <FaClipboardList />, color: "text-teal-600", path: "/exams" },
    ],
  },
  {
    id: 2,
    sectionTitle: "💰 Finance",
    stats: [
      { id: 7, title: "Monthly Earnings", value: "৳ 2,45,000", icon: <FaMoneyBillWave />, color: "text-yellow-600", path: "/monthly-earnings" },
      { id: 8, title: "Expenses", value: "৳ 1,10,000", icon: <FaRegBuilding />, color: "text-red-600", path: "/expenses" },
      { id: 9, title: "Pending Fees", value: "৳ 45,000", icon: <FaFileInvoiceDollar />, color: "text-rose-600", path: "/pending-fees" },
    ],
  },
  {
    id: 3,
    sectionTitle: "📊 Attendance",
    stats: [
      { id: 10, title: "Student Attendance", value: "94%", icon: <FaCalendarCheck />, color: "text-purple-600", path: "/attendance/students" },
      { id: 11, title: "Teacher Attendance", value: "98%", icon: <FaCalendarCheck />, color: "text-rose-600", path: "/attendance/teachers" },
    ],
  },
  {
    id: 4,
    sectionTitle: "⚙️ Administration & Facilities",
    stats: [
      { id: 12, title: "Admins & Staff", value: "25", icon: <FaUsersCog />, color: "text-gray-700", path: "/admins-staff" },
      { id: 13, title: "Library Books", value: "8,500", icon: <FaLaptop />, color: "text-cyan-600", path: "/library" },
      { id: 14, title: "Transport Vehicles", value: "25", icon: <FaBusAlt />, color: "text-amber-600", path: "/transport" },
      { id: 15, title: "Events Scheduled", value: "7", icon: <FaRegCalendarAlt />, color: "text-lime-600", path: "/events" },
      { id: 16, title: "Health Records", value: "1,200", icon: <FaMedkit />, color: "text-emerald-600", path: "/health" },
      { id: 17, title: "Active Notices", value: "15", icon: <FaBell />, color: "text-fuchsia-600", path: "/notices" },
    ],
  },
];

const StatsCards: React.FC = () => {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.id}>
          <h2 className="text-xl font-bold text-gray-700 mb-4">{section.sectionTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {section.stats.map((stat) => (
              <Link
                to={stat.path}
                key={stat.id}
                className="bg-white rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition hover:bg-gray-50"
              >
                <div className={`text-4xl ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
