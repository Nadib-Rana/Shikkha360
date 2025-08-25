import React from "react";
import useAssignment from "../hooks/useAssignment";
import type { Assignment } from "../hooks/useAssignment";
import SubmitAssignment from "../components/SubmitAssignment";

interface Props {
  userId: string;
  role: "student" | "teacher";
  classId?: string;
}

const AssignmentList: React.FC<Props> = ({ userId, role, classId }) => {
  const { assignments, loading, error } = useAssignment({ role, userId, classId });

  if (loading) return <p className="text-center">Loading assignments...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (assignments.length === 0) return <p className="text-center">No assignments found.</p>;

  return (
    <div className="space-y-4">
      {assignments.map((assignment: Assignment) => (
        <div
          key={assignment.id}
          className="p-4 border rounded shadow flex flex-col md:flex-row md:justify-between md:items-center"
        >
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p className="text-sm text-gray-500">
              Due: {new Date(assignment.dueDate).toLocaleDateString()}
            </p>
          </div>

          {role === "student" && (
            <div className="mt-2 md:mt-0">
              <SubmitAssignment
                assignmentId={assignment.id}
                userId={userId}
                classId={classId}
              />
            </div>
          )}

          {role === "teacher" && assignment.fileUrl && (
            <div className="mt-2 md:mt-0">
              <a
                href={assignment.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Submitted File
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;
