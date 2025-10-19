import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

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
    const token = localStorage.getItem('authToken');

    axios.get<User[]>('http://localhost:5000/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setUsers(res.data.filter(u => u.role === 'student'));
        setParents(res.data.filter(u => u.role === 'parent'));
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });

    axios.get<Class[]>('http://localhost:5000/classes', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setClasses(res.data))
      .catch(err => {
        console.error('Error fetching classes:', err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      const payload = {
        ...form,
        documents: form.documents.split(',').map(doc => doc.trim()),
      };

      await axios.post('http://localhost:5000/students', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
        {/* Searchable Student Dropdown */}
        <Select
          name="userId"
          value={users.find(u => u._id === form.userId) || null}
          onChange={(selected) => setForm({ ...form, userId: selected?._id || '' })}
          options={users}
          getOptionLabel={(u) => `${u.name} (${u.email})`}
          getOptionValue={(u) => u._id}
          placeholder="Search and select student"
          className="react-select-container"
          classNamePrefix="react-select"
        />

        <input
          type="text"
          name="studentID"
          value={form.studentID}
          onChange={handleChange}
          placeholder="Student ID (e.g. STD2025-111)"
          className="w-full p-2 border rounded"
          required
        />

        {/* Class Dropdown */}
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

        {/* Section Dropdown */}
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

        {/* Searchable Parent Dropdown */}
        <Select
          name="parentId"
          value={parents.find(p => p._id === form.parentId) || null}
          onChange={(selected) => setForm({ ...form, parentId: selected?._id || '' })}
          options={parents}
          getOptionLabel={(p) => `${p.name} (${p.email})`}
          getOptionValue={(p) => p._id}
          placeholder="Search and select parent"
          className="react-select-container"
          classNamePrefix="react-select"
        />

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