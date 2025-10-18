import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Toast from "../../components/common/Toast"; // Adjust path if needed

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
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setToast({ message: "No token found. Please log in again.", type: "error" });
        return;
      }

      await axios.delete(`${import.meta.env.VITE_API_URL}/exams/${exam._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setToast({ message: "Exam deleted successfully ✅", type: "success" });
      onDeleted?.();
    } catch (err: any) {
      console.error("Delete error:", err);
      const status = err.response?.status;
      const message = err.response?.data?.message || "Failed to delete exam ❌";

      if (status === 403) {
        setToast({ message: "Access denied: " + message, type: "error" });
      } else if (status === 401) {
        setToast({ message: "Authentication failed. Please log in again ❌", type: "error" });
      } else {
        setToast({ message, type: "error" });
      }
    }
  };

  return (
    <>
      <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <h3 className="text-lg font-bold text-blue-700">{exam.title}</h3>
        <p>Type: {exam.type}</p>
        <p>Date: {new Date(exam.date).toLocaleString()}</p>
        <p>
          Class:{" "}
          {exam.classId
            ? `${exam.classId.gradeLevel}${exam.classId.section ? ` (${exam.classId.section})` : ""}`
            : "—"}
        </p>
        <p>Subject: {exam.subjectId?.name || "—"}</p>
        <p>Created By: {exam.createdBy?.name || "—"}</p>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onView?.(exam)}
            className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2"
          >
            <FaEye /> View
          </button>

          {canEdit && (
            <button
              onClick={() => onEdit?.(exam)}
              className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <FaEdit /> Edit
            </button>
          )}

          {canDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <FaTrash /> Delete
            </button>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default ExamCard;