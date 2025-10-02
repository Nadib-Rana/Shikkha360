import React, { useEffect, useState } from "react";
import axios from "axios";

// Subject type
interface Subject {
  _id: string;
  name: string;
  code: string;
}

// Class type
interface Class {
  _id: string;
  gradeLevel: string;
  section: string;
}

// Student type
interface Student {
  _id: string;
  name: string;
  classId: string;
}

// Assignment type
interface Assignment {
  _id: string;
  subject: Subject;
  studentIds: string[];
  fileUrl?: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Graded";
}

const TeacherAssignments: React.FC = () => {
  // Store fetched subjects, classes, students, assignments
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  // Form state
  const [form, setForm] = useState({
    subjectId: "",
    classId: "",
    studentIds: [] as string[],
    dueDate: "",
    status: "Pending",
    file: null as File | null,
  });

  // Track assignment being edited
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subs, cls, stus, assigns] = await Promise.all([
          axios.get("http://localhost:5000/subjects"),
          axios.get("http://localhost:5000/classes"),
          axios.get("http://localhost:5000/students"),
          axios.get("http://localhost:5000/assignments"),
        ]);
        setSubjects(subs.data);
        setClasses(cls.data);
        setStudents(stus.data);
        setAssignments(assigns.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Filter students based on selected class
  const filteredStudents = students.filter((s) => s.classId === form.classId);

  // Create or Update assignment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("subject", form.subjectId);
      formData.append("classId", form.classId);
      formData.append("studentIds", JSON.stringify(form.studentIds));
      formData.append("dueDate", form.dueDate);
      formData.append("status", form.status);
      if (form.file) formData.append("file", form.file);

      if (editId) {
        // Update assignment
        const res = await axios.put(
          `http://localhost:5000/assignments/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setAssignments(
          assignments.map((a) => (a._id === editId ? res.data : a))
        );
        setEditId(null);
      } else {
        // Create new assignment
        const res = await axios.post(
          "http://localhost:5000/assignments",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setAssignments([res.data, ...assignments]);
      }

      // Reset form
      setForm({
        subjectId: "",
        classId: "",
        studentIds: [],
        dueDate: "",
        status: "Pending",
        file: null,
      });
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Failed to submit assignment");
    }
  };

  // Delete assignment
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure to delete this assignment?")) return;
    try {
      await axios.delete(`http://localhost:5000/assignments/${id}`);
      setAssignments(assignments.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete assignment");
    }
  };

  // Edit assignment (populate form)
  const handleEdit = (assignment: Assignment) => {
    setForm({
      subjectId: assignment.subject?._id || "",
      classId: assignment.classId || "",
      studentIds: assignment.studentIds,
      dueDate: assignment.dueDate.split("T")[0],
      status: assignment.status,
      file: null,
    });
    setEditId(assignment._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {editId ? "✏️ Update Assignment" : "📝 Create Assignment"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {/* Subject */}
        <select
          value={form.subjectId}
          onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} ({s.code})
            </option>
          ))}
        </select>

        {/* Class */}
        <select
          value={form.classId}
          onChange={(e) => setForm({ ...form, classId: e.target.value })}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c._id} value={c._id}>
              {c.gradeLevel} - Section {c.section}
            </option>
          ))}
        </select>

        {/* Students */}
        <div className="border p-2">
          <label className="block font-medium mb-1">
            Select Students (optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {filteredStudents.map((s) => (
              <label key={s._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.studentIds.includes(s._id)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...form.studentIds, s._id]
                      : form.studentIds.filter((id) => id !== s._id);
                    setForm({ ...form, studentIds: updated });
                  }}
                />
                <span>{s.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Due date */}
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          required
          className="border p-2 w-full"
        />

        {/* Status */}
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="Pending">Pending</option>
          <option value="Submitted">Submitted</option>
          <option value="Graded">Graded</option>
        </select>

        {/* File */}
        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, file: e.target.files?.[0] || null })
          }
          className="border p-2 w-full"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Assignment" : "Create Assignment"}
        </button>
      </form>

      {/* Assignment list */}
      <h3 className="text-xl mb-2">📋 Assignments</h3>
      <ul className="space-y-2">
        {assignments.map((a) => (
          <li
            key={a._id}
            className="border p-2 flex justify-between items-center"
          >
            <div>
              <p>Subject: {a.subject?.name || "—"}</p>
              <p>Due Date: {new Date(a.dueDate).toLocaleDateString()}</p>
              <p>Status: {a.status}</p>
              {a.fileUrl && (
                <a
                  href={`http://localhost:5000${a.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Download File
                </a>
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(a)}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(a._id)}
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

export default TeacherAssignments;
