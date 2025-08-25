import React from "react";

interface Props {
  title: string;
  dueDate: string;
  submitted: boolean;
}

const AssignmentCard: React.FC<Props> = ({ title, dueDate, submitted }) => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="font-bold">{title}</h3>
      <p>Due: {dueDate}</p>
      <p>Status: {submitted ? "Submitted" : "Pending"}</p>
    </div>
  );
};

export default AssignmentCard;
