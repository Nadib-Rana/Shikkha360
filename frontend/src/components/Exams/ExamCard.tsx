import React from "react";
import axios from "axios";

interface Exam {
  _id: string;
  title: string;
  type: string;
  date: string;
  classId?: {
    _id: string;
    gradeLevel: string;
    section?: string;
  };
  subjectId?: {
    _id: string;
    name: string;
    code?: string;
  };
  createdBy?: {
    _id: string;
    name: string;
    email?: string;
  };
}

interface ExamCardProps {
  exam: Exam;
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: (exam: Exam) => void;
  onDeleted?: () => void;
  onView?: (exam: Exam) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({
  exam,
  canEdit = false,
  canDelete = false,
  onEdit,
  onDeleted,
  onView,
}) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/exams/${exam._id}`);
      alert("Exam deleted successfully ✅");
      onDeleted?.();
    } catch (err) {
      console.error(err);
      alert("Failed to delete exam ❌");
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-bold text-blue-700">{exam.title}</h3>
      <p>Type: {exam.type}</p>
      <p>Date: {new Date(exam.date).toLocaleString()}</p>
      <p>
        Class: {exam.classId ? `${exam.classId.gradeLevel}${exam.classId.section ? ` (${exam.classId.section})` : ""}` : "—"}
      </p>
      <p>Subject: {exam.subjectId?.name || "—"}</p>
      <p>Created By: {exam.createdBy?.name || "—"}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onView?.(exam)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          👁 View
        </button>
        {canEdit && (
          <button
            onClick={() => onEdit?.(exam)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            ✏️ Edit
          </button>
        )}
        {canDelete && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamCard;