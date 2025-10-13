import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddSubjects from './AddSubjects'; // adjust path if needed

interface Subject {
  _id: string;
  name: string;
  code: string;
  assignedTeacherIds: string[];
}

interface Teacher {
  _id: string;
  name: string;
  email: string;
}

const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filtered, setFiltered] = useState<Subject[]>([]);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = async () => {
    try {
      const [subRes, teacherRes] = await Promise.all([
        axios.get<Subject[]>('http://localhost:5000/subjects'),
        axios.get<Teacher[]>('http://localhost:5000/users'),
      ]);
      const teacherList = teacherRes.data.filter(t => t.role === 'teacher');
      setSubjects(subRes.data);
      setFiltered(subRes.data);
      setTeachers(teacherList);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSearch = (query: string) => {
    const lower = query.toLowerCase();
    const result = subjects.filter(s =>
      s.name.toLowerCase().includes(lower) ||
      s.code.toLowerCase().includes(lower)
    );
    setFiltered(result);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubject) {
      await axios.put(`http://localhost:5000/subjects/${selectedSubject._id}`, selectedSubject);
      setEditMode(false);
      setSelectedSubject(null);
      fetchSubjects();
    }
  };

  const getTeacherNames = (ids: string[]) =>
    teachers.filter(t => ids.includes(t._id)).map(t => t.name).join(', ');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📚 Subject List</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or code"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          className="p-2 border rounded w-full max-w-md"
        />
        <button
          onClick={() => setShowAddForm(true)}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Subject
        </button>
      </div>

      {/* Add Subject Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Subject</h3>
            <AddSubjects onSuccess={() => {
              setShowAddForm(false);
              fetchSubjects();
            }} />
            <button
              onClick={() => setShowAddForm(false)}
              className="mt-4 text-gray-600 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading subjects...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Error: {error}</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Code</th>
              <th className="p-3">Assigned Teachers</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.code}</td>
                <td className="p-3">{getTeacherNames(s.assignedTeacherIds)}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => { setSelectedSubject(s); setEditMode(false); }} className="text-blue-600 hover:underline">View</button>
                  <button onClick={() => { setSelectedSubject(s); setEditMode(true); }} className="text-green-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* View/Edit Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editMode ? 'Edit Subject' : 'Subject Details'}
            </h3>

            {editMode ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <input
                  type="text"
                  value={selectedSubject.name}
                  onChange={e => setSelectedSubject({ ...selectedSubject, name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={selectedSubject.code}
                  onChange={e => setSelectedSubject({ ...selectedSubject, code: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <select
                  multiple
                  value={selectedSubject.assignedTeacherIds}
                  onChange={e => {
                    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                    setSelectedSubject({ ...selectedSubject, assignedTeacherIds: selected });
                  }}
                  className="w-full p-2 border rounded"
                >
                  {teachers.map(t => (
                    <option key={t._id} value={t._id}>
                      {t.name} ({t.email})
                    </option>
                  ))}
                </select>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {selectedSubject.name}</p>
                <p><strong>Code:</strong> {selectedSubject.code}</p>
                <p><strong>Assigned Teachers:</strong> {getTeacherNames(selectedSubject.assignedTeacherIds)}</p>
              </div>
            )}

            <button onClick={() => setSelectedSubject(null)} className="mt-4 text-gray-600 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectList;