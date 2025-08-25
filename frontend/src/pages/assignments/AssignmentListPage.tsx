import React from "react";
import AssignmentCard from "../../components/dashboard/AssignmentCard";

const AssignmentListPage: React.FC = () => {
  const dummyAssignments = [
    { title: "Math Homework", dueDate: "2025-08-30", submitted: true },
    { title: "Science Project", dueDate: "2025-09-05", submitted: false },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      <div className="grid grid-cols-2 gap-4">
        {dummyAssignments.map((a, i) => (
          <AssignmentCard key={i} {...a} />
        ))}
      </div>
    </div>
  );
};

export default AssignmentListPage;
