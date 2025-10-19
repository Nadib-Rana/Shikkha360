import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

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

interface Teacher {
  userId: string;
  email: string;
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
  const [existingTeachers, setExistingTeachers] = useState<Teacher[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    const fetchData = async () => {
      try {
        const [userRes, teacherRes, subjectRes] = await Promise.all([
          axios.get<User[]>('http://localhost:5000/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<{ userId: string }[]>('http://localhost:5000/teachers', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<Subject[]>('http://localhost:5000/subjects', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const assignedUserIds = teacherRes.data.map(t => t.userId);
        const availableTeachers = userRes.data.filter(
          u => u.role === 'teacher' && !assignedUserIds.includes(u._id)
        );

        const teacherEmails: Teacher[] = teacherRes.data.map(t => {
          const match = userRes.data.find(u => u._id === t.userId);
          return match ? { userId: t.userId, email: match.email } : { userId: t.userId, email: '' };
        });

        setUsers(availableTeachers);
        setSubjects(subjectRes.data);
        setExistingTeachers(teacherEmails);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubjectsChange = (selected: any) => {
    const subjectIds = selected.map((s: Subject) => s._id);
    setForm({ ...form, subjects: subjectIds });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    const token = localStorage.getItem('authToken');
    const selectedUser = users.find(u => u._id === form.userId);
    if (!selectedUser) {
      setError('Please select a valid teacher.');
      return;
    }

    const isDuplicate = existingTeachers.some(
      t => t.userId === selectedUser._id || t.email === selectedUser.email
    );

    if (isDuplicate) {
      setError('❌ This teacher is already assigned (duplicate ID or email).');
      return;
    }

    try {
      await axios.post('http://localhost:5000/teachers', form, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
        <Select
          name="userId"
          value={users.find(u => u._id === form.userId) || null}
          onChange={(selected) => setForm({ ...form, userId: selected?._id || '' })}
          options={users}
          getOptionLabel={(u) => `${u.name} (${u.email})`}
          getOptionValue={(u) => u._id}
          placeholder="Search and select teacher"
          className="react-select-container"
          classNamePrefix="react-select"
        />

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

        <Select
          isMulti
          value={subjects.filter(s => form.subjects.includes(s._id))}
          onChange={handleSubjectsChange}
          options={subjects}
          getOptionLabel={(s) => `${s.name} (${s.code})`}
          getOptionValue={(s) => s._id}
          placeholder="Select subjects taught"
          className="react-select-container"
          classNamePrefix="react-select"
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

export default AddTeacher;