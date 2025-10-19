
import React from 'react';
import StatsCards from "../../components/layout/StatsCards";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserFriends,
  FaUniversity,
  FaBookOpen,
  FaClipboardList,
} from "react-icons/fa";

const academicStats = [
  {
    id: 1,
    title: "Total Students",
    value: "1,250",
    icon: <FaUserGraduate />,
    color: "text-blue-600",
    path: "/total-student",
  },
  {
    id: 2,
    title: "Total Teachers",
    value: "85",
    icon: <FaChalkboardTeacher />,
    color: "text-green-600",
    path: "/total-teacher",
  },
  {
    id: 3,
    title: "Total Parents",
    value: "1,200",
    icon: <FaUserFriends />,
    color: "text-pink-600",
    path: "/total-parents",
  },
  {
    id: 4,
    title: "Total Classes",
    value: "40",
    icon: <FaUniversity />,
    color: "text-indigo-600",
    path: "/total-classes",
  },
  {
    id: 5,
    title: "Total Subjects",
    value: "65",
    icon: <FaBookOpen />,
    color: "text-orange-600",
    path: "/total-subjects",
  },
  {
    id: 6,
    title: "Exams Scheduled",
    value: "12",
    icon: <FaClipboardList />,
    color: "text-teal-600",
    path: "/exams",
  },
];

const sections = [
  {
    id: 1,
    sectionTitle: "🎓 Academics",
    stats: academicStats,
  },
];
const ParentDashboard: React.FC = () => {
   return <StatsCards sections={sections} />;
};

export default ParentDashboard;
