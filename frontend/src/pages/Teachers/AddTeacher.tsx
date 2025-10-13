import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Subject {
  _id: string;
  name: string;
  code: string;
}

interface Props {
  onSuccess?: () => void;
}

const AddTeacher: React.FC<Props> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    userId: '',
    teacherID: '',
    joiningDate: '',
    qualifications: '',
    subjects: [] as string[],
  });

  const [users, setUsers] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get<User[]>('http://localhost:5000/users')
      .then(res => {
        const teachers = res.data.filter(u => u.role === 'teacher');
        setUsers(teachers);
      });

    axios.get<Subject[]>('http://localhost:5000/subjects')
      .then(res => setSubjects(res.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setForm({ ...form, subjects: selected });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await axios.post('http://localhost:5000/teachers', form);
      setSuccess('✅ Teacher added successfully!');
      setForm({
        userId: '',
        teacherID: '',
        joiningDate: '',
        qualifications: '',
        subjects: [],
      });
      if (onSuccess) onSuccess();
    } catch {
      setError('❌ Failed to add teacher. Please check the data.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">➕ Add New Teacher</h2>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="userId"
          value={form.userId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Teacher Name</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <input
          type="text"
          name="teacherID"
          value={form.teacherID}
          onChange={handleChange}
          placeholder="Teacher ID (e.g. TCH2025-010)"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="joiningDate"
          value={form.joiningDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="qualifications"
          value={form.qualifications}
          onChange={handleChange}
          placeholder="Qualifications (e.g. MSc in Physics)"
          className="w-full p-2 border rounded"
        />

        {/* Dynamic Subject Selection */}
        <select
          multiple
          value={form.subjects}
          onChange={handleSubjectsChange}
          className="w-full p-2 border rounded"
        >
          {subjects.map(subject => (
            <option key={subject._id} value={subject._id}>
              {subject.name} ({subject.code})
            </option>
          ))}
        </select>

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

export default AddTeacher;