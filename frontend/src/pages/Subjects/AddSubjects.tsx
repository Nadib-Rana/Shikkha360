import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Teacher {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Props {
  onSuccess?: () => void;
}

const AddSubjects: React.FC<Props> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    code: '',
    assignedTeacherIds: [] as string[],
  });

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get<Teacher[]>('http://localhost:5000/users')
      .then(res => {
        const filtered = res.data.filter(u => u.role === 'teacher');
        setTeachers(filtered);
      })
      .catch(() => setError('❌ Failed to load teachers.'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTeacherSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setForm({ ...form, assignedTeacherIds: selected });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await axios.post('http://localhost:5000/subjects', form);
      setSuccess('✅ Subject added successfully!');
      setForm({ name: '', code: '', assignedTeacherIds: [] });
      if (onSuccess) onSuccess();
    } catch {
      setError('❌ Failed to add subject. Please check the data.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">➕ Add New Subject</h2>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Subject Name (e.g. Mathematics)"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Subject Code (e.g. MATH101)"
          className="w-full p-2 border rounded"
          required
        />

        <select
          multiple
          value={form.assignedTeacherIds}
          onChange={handleTeacherSelect}
          className="w-full p-2 border rounded"
        >
          {teachers.map(t => (
            <option key={t._id} value={t._id}>
              {t.name} ({t.email})
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

export default AddSubjects;