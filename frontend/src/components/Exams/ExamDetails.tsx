import React, { useEffect, useState } from "react";
import axios from "axios";

interface ExamDetailsProps {
  examId: string;
  onClose: () => void;
}

const ExamDetails: React.FC<ExamDetailsProps> = ({ examId, onClose }) => {
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/exams/${examId}`);
        setExam(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  if (loading) return <div>Loading...</div>;
  if (!exam) return <div>Exam not found</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2">{exam.title}</h2>
        <p>Type: {exam.type}</p>
        <p>Date: {new Date(exam.date).toLocaleString()}</p>
        <p>Class: {exam.classId?.gradeLevel || "—"}</p>
        <p>Subject: {exam.subjectId?.name || "—"}</p>
        <p>Created By: {exam.createdBy?.name || "—"}</p>
        <p>Description: {exam.description || "—"}</p>

        <button onClick={onClose} className="mt-4 bg-gray-400 px-4 py-2 rounded text-white">
          Close
        </button>
      </div>
    </div>
  );
};

export default ExamDetails;
