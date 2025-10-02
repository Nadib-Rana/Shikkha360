import React, { useEffect, useState } from "react";
import axios from "axios";

// Result type
interface Result {
  _id: string;
  studentName: string;
  subject: string;
  marks: number;
  grade: string;
}

const TeacherResults: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [form, setForm] = useState({
    studentName: "",
    subject: "",
    marks: "",
    grade: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch all results
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:5000/results");
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  // Create / Update result
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await axios.put(
          `http://localhost:5000/results/${editId}`,
          form
        );
        setResults(results.map((r) => (r._id === editId ? res.data : r)));
        setEditId(null);
      } else {
        const res = await axios.post("http://localhost:5000/results", form);
        setResults([res.data, ...results]);
      }
      setForm({ studentName: "", subject: "", marks: "", grade: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit result");
    }
  };

  // Delete result
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure to delete this result?")) return;
    try {
      await axios.delete(`http://localhost:5000/results/${id}`);
      setResults(results.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete result");
    }
  };

  // Edit result
  const handleEdit = (r: Result) => {
    setForm({
      studentName: r.studentName,
      subject: r.subject,
      marks: r.marks.toString(),
      grade: r.grade,
    });
    setEditId(r._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {editId ? "✏️ Update Result" : "📝 Add Result"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Student Name"
          value={form.studentName}
          onChange={(e) => setForm({ ...form, studentName: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Marks"
          value={form.marks}
          onChange={(e) => setForm({ ...form, marks: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Grade"
          value={form.grade}
          onChange={(e) => setForm({ ...form, grade: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Result" : "Add Result"}
        </button>
      </form>

      <h3 className="text-xl mb-2">📋 Results</h3>
      <ul className="space-y-2">
        {results.map((r) => (
          <li
            key={r._id}
            className="border p-2 flex justify-between items-center"
          >
            <div>
              <p>Student: {r.studentName}</p>
              <p>Subject: {r.subject}</p>
              <p>Marks: {r.marks}</p>
              <p>Grade: {r.grade}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(r)}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r._id)}
                className="bg-red-500 px-2 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherResults;
