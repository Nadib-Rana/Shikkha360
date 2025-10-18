import React, { useState, useEffect } from "react";
import axios from "axios";

interface ExamFormProps {
  onClose: () => void;
  onSuccess: () => void;
  examToEdit?: any;
}

const ExamForm: React.FC<ExamFormProps> = ({ onClose, onSuccess, examToEdit }) => {
  const [examData, setExamData] = useState({
    title: "",
    type: "midterm",
    date: "",
    classId: "",
    subjectId: "",
    createdBy: "",
    description: "",
  });

  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [creators, setCreators] = useState<any[]>([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (examToEdit) {
      setExamData({
        title: examToEdit.title || "",
        type: examToEdit.type || "midterm",
        date: examToEdit.date ? examToEdit.date.slice(0, 16) : "",
        classId: examToEdit.classId?._id || examToEdit.classId || "",
        subjectId: examToEdit.subjectId?._id || examToEdit.subjectId || "",
        createdBy: examToEdit.createdBy?._id || examToEdit.createdBy || "",
        description: examToEdit.description || "",
      });
    }
  }, [examToEdit]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [classRes, subjectRes, userRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/classes`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/subjects`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/users?role=admin`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setClasses(classRes.data || []);
        setSubjects(subjectRes.data || []);
        setCreators(userRes.data || []);
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      }
    };

    if (token) fetchDropdownData();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      if (examToEdit) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/exams/${examToEdit._id}`,
          examData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/exams`, examData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Exam save error:", err);
      const msg = err.response?.data?.message || "Failed to save exam";
      alert(msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {examToEdit ? "Edit Exam" : "Add Exam"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={examData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="type"
            value={examData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="midterm">Midterm</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="final">Final</option>
            <option value="quiz">Quiz</option>
          </select>

          <input
            type="datetime-local"
            name="date"
            value={examData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="classId"
            value={examData.classId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.gradeLevel}
                {cls.section ? ` (${cls.section})` : ""}
              </option>
            ))}
          </select>

          <select
            name="subjectId"
            value={examData.subjectId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subj) => (
              <option key={subj._id} value={subj._id}>
                {subj.name} {subj.code ? `(${subj.code})` : ""}
              </option>
            ))}
          </select>

          <select
            name="createdBy"
            value={examData.createdBy}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Creator</option>
            {creators.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>

          <textarea
            name="description"
            value={examData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-between mt-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {examToEdit ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamForm;