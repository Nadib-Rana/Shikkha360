import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store"; // ✅ type-only import
import AdminDashboard from "./dashboard/AdminDashboard";
import TeacherDashboard from "./dashboard/TeacherDashboard";
import StudentDashboard from "./dashboard/StudentDashboard";
import NotFound from "./NotFound";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">User not logged in</p>
      </div>
    );
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "teacher":
      return <TeacherDashboard />;
    case "student":
      return <StudentDashboard />;
    default:
      return <NotFound />;
  }
};

export default Dashboard;
