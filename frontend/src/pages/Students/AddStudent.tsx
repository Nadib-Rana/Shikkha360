import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Class {
  _id: string;
  gradeLevel: string;
  section: string;
}

interface Props {
  onSuccess?: () => void;
}

const AddStudent: React.FC<Props> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    userId: '',
    studentID: '',
    classId: '',
    section: '',
    admissionDate: '',
    parentId: '',
    documents: '',
  });

  const [users, setUsers] = useState<User[]>([]);
  const [parents, setParents] = useState<User[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get<User[]>('http://localhost:5000/users')
      .then(res => {
        setUsers(res.data.filter(u => u.role === 'student'));
        setParents(res.data.filter(u => u.role === 'parent'));
      });

    axios.get<Class[]>('http://localhost:5000/classes')
      .then(res => setClasses(res.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const payload = {
        ...form,
        documents: form.documents.split(',').map(doc => doc.trim()),
      };
      await axios.post('http://localhost:5000/students', payload);
      setSuccess('✅ Student added successfully!');
      setForm({
        userId: '',
        studentID: '',
        classId: '',
        section: '',
        admissionDate: '',
        parentId: '',
        documents: '',
      });
      if (onSuccess) onSuccess();
    } catch {
      setError('❌ Failed to add student. Please check the data.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">➕ Add New Student</h2>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Student by Name */}
        <select
          name="userId"
          value={form.userId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Student Name</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <input
          type="text"
          name="studentID"
          value={form.studentID}
          onChange={handleChange}
          placeholder="Student ID (e.g. STD2025-111)"
          className="w-full p-2 border rounded"
          required
        />

        {/* Select Class by Grade + Section */}
        <select
          name="classId"
          value={form.classId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls._id} value={cls._id}>
              {cls.gradeLevel} - Section {cls.section}
            </option>
          ))}
        </select>

        {/* Select Section (redundant if class includes it) */}
        <select
          name="section"
          value={form.section}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        <input
          type="date"
          name="admissionDate"
          value={form.admissionDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Select Parent by Name */}
        <select
          name="parentId"
          value={form.parentId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Parent</option>
          {parents.map(parent => (
            <option key={parent._id} value={parent._id}>
              {parent.name} ({parent.email})
            </option>
          ))}
        </select>

        <input
          type="text"
          name="documents"
          value={form.documents}
          onChange={handleChange}
          placeholder="Documents (comma-separated)"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudent;

