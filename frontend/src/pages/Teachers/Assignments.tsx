import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Class { _id: string; name: string }
interface Section { _id: string; name: string; classId: string }
interface Student { _id: string; name: string; sectionId: string }
interface Subject { _id: string; name: string }

const TeacherAssignments: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);

  const [form, setForm] = useState({
    subject: '',
    classId: '',
    sectionId: '',
    studentIds: [] as string[],
    dueDate: '',
    status: 'Pending',
    file: null as File | null,
  });

  useEffect(() => {
    axios.get('http://localhost:5000/classes').then(res => setClasses(res.data));
    axios.get('http://localhost:5000/sections').then(res => setSections(res.data));
    axios.get('http://localhost:5000/students').then(res => setStudents(res.data));
    axios.get('http://localhost:5000/subjects').then(res => setSubjects(res.data));
    axios.get('http://localhost:5000/assignments').then(res => setAssignments(res.data));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('subject', form.subject);
    formData.append('classId', form.classId);
    formData.append('sectionId', form.sectionId);
    formData.append('studentIds', JSON.stringify(form.studentIds));
    formData.append('dueDate', form.dueDate);
    formData.append('status', form.status);
    if (form.file) formData.append('file', form.file);

    await axios.post('http://localhost:5000/assignments', formData);
    setForm({ subject: '', classId: '', sectionId: '', studentIds: [], dueDate: '', status: 'Pending', file: null });
    const updated = await axios.get('http://localhost:5000/assignments');
    setAssignments(updated.data);
  };

  const filteredSections = sections.filter(s => s.classId === form.classId);
  const filteredStudents = students.filter(s => s.sectionId === form.sectionId);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">📝 Create Assignment</h2>

      <form onSubmit={handleCreate} className="space-y-4 mb-8">
        <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
          className="w-full p-2 border rounded" required>
          <option value="">Select Subject</option>
          {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>

        <select value={form.classId} onChange={e => setForm({ ...form, classId: e.target.value, sectionId: '', studentIds: [] })}
          className="w-full p-2 border rounded">
          <option value="">Select Class</option>
          {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>

        <select value={form.sectionId} onChange={e => setForm({ ...form, sectionId: e.target.value, studentIds: [] })}
          className="w-full p-2 border rounded">
          <option value="">Select Section</option>
          {filteredSections.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>

        <div className="border rounded p-2">
          <label className="block mb-1 font-medium">Select Students</label>
          <div className="grid grid-cols-2 gap-2">
            {filteredStudents.map(s => (
              <label key={s._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.studentIds.includes(s._id)}
                  onChange={e => {
                    const updated = e.target.checked
                      ? [...form.studentIds, s._id]
                      : form.studentIds.filter(id => id !== s._id);
                    setForm({ ...form, studentIds: updated });
                  }}
                />
                <span>{s.name}</span>
              </label>
            ))}
          </div>
        </div>

        <input type="date" value={form.dueDate}
          onChange={e => setForm({ ...form, dueDate: e.target.value })}
          className="w-full p-2 border rounded" required />

        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
          className="w-full p-2 border rounded">
          <option value="Pending">Pending</option>
          <option value="Submitted">Submitted</option>
          <option value="Graded">Graded</option>
        </select>

        <input type="file" onChange={e => setForm({ ...form, file: e.target.files?.[0] || null })}
          className="w-full p-2 border rounded" />

        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Create Assignment
        </button>
      </form>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 All Assignments</h2>
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Subject</th>
            <th className="p-3">Due Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">File</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(a => (
            <tr key={a._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{a.subject?.name || '—'}</td>
              <td className="p-3">{new Date(a.dueDate).toLocaleDateString()}</td>
              <td className="p-3">{a.status}</td>
              <td className="p-3">
                {a.fileUrl ? (
                  <a href={`http://localhost:5000${a.fileUrl}`} target="_blank" className="text-blue-600 underline">Download</a>
                ) : (
                  <span className="text-gray-500">No file</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherAssignments;