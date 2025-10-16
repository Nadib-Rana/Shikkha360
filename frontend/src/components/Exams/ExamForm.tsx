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

  useEffect(() => {
    if (examToEdit) {
      setExamData(examToEdit);
    }
  }, [examToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (examToEdit) {
        await axios.put(`${import.meta.env.VITE_API_URL}/exams/${examToEdit._id}`, examData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/exams`, examData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save exam");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{examToEdit ? "Edit Exam" : "Add Exam"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={examData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
            required
          />
          <select name="type" value={examData.type} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="midterm">Midterm</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="final">Final</option>
            <option value="quiz">Quiz</option>
          </select>
          <input type="datetime-local" name="date" value={examData.date} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="classId" value={examData.classId} onChange={handleChange} placeholder="Class ID" className="w-full border p-2 rounded" />
          <input name="subjectId" value={examData.subjectId} onChange={handleChange} placeholder="Subject ID" className="w-full border p-2 rounded" />
          <input name="createdBy" value={examData.createdBy} onChange={handleChange} placeholder="Creator ID" className="w-full border p-2 rounded" />
          <textarea name="description" value={examData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
          <div className="flex justify-between mt-3">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{examToEdit ? "Update" : "Create"}</button>
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamForm;