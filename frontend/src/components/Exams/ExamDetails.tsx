import React, { useEffect, useState } from "react";
import axios from "axios";

interface ExamDetailsProps {
  examId: string;
  onClose: () => void;
}

const ExamDetails: React.FC<ExamDetailsProps> = ({ examId, onClose }) => {
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExam = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/exams/${examId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExam(res.data);
      } catch (err: any) {
        console.error("Error fetching exam:", err);
        setError(err.response?.data?.message || "Failed to load exam details.");
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-4">{error}</div>;
  if (!exam) return <div className="text-center py-4">Exam not found</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-2 text-blue-700">{exam.title}</h2>
        <p><strong>Type:</strong> {exam.type}</p>
        <p><strong>Date:</strong> {new Date(exam.date).toLocaleString()}</p>
        <p>
          <strong>Class:</strong>{" "}
          {exam.classId?.gradeLevel
            ? `${exam.classId.gradeLevel}${exam.classId.section ? ` (${exam.classId.section})` : ""}`
            : "—"}
        </p>
        <p><strong>Subject:</strong> {exam.subjectId?.name || "—"}</p>
        <p><strong>Created By:</strong> {exam.createdBy?.name || "—"}</p>
        <p><strong>Description:</strong> {exam.description || "—"}</p>

        <button
          onClick={onClose}
          className="mt-6 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ExamDetails;