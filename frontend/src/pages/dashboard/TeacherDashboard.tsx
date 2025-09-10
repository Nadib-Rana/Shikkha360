import React from "react";
import AttendanceCard from "../../components/dashboard/AttendanceCard";
import AssignmentCard from "../../components/dashboard/AssignmentCard";
import UpcomingClassCard from "../../components/dashboard/UpcomingClassCard";

const TeacherDashboard: React.FC = () => {
  const dummyStudents = [
    { studentName: "John Doe", attendance: 90 },
    { studentName: "Jane Smith", attendance: 85 },
  ];

  const dummyAssignments = [
    { title: "Math Homework", dueDate: "2025-08-30", submitted: true },
    { title: "Science Project", dueDate: "2025-09-05", submitted: false },
  ];

  const dummyClasses = [
    { subject: "Math", time: "09:00 AM" },
    { subject: "Science", time: "10:30 AM" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {dummyStudents.map((s, i) => (
          <AttendanceCard key={i} {...s} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {dummyAssignments.map((a, i) => (
          <AssignmentCard key={i} {...a} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {dummyClasses.map((c, i) => (
          <UpcomingClassCard key={i} {...c} />
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
