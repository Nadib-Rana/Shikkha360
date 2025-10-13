import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTeacher from './AddTeacher';

interface Teacher {
  _id: string;
  teacherID: string;
  subjects: string[];
  classIds: string[];
  joiningDate: string;
  qualifications: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    createdAt: string;
  };
}

const TeachersList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filtered, setFiltered] = useState<Teacher[]>([]);
  const [search, setSearch] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeachers = () => {
    axios.get<Teacher[]>('http://localhost:5000/teachers')
      .then(res => {
        setTeachers(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSearch = (query: string) => {
    const lower = query.toLowerCase();
    const result = teachers.filter(t =>
      t.teacherID.toLowerCase().includes(lower) ||
      t.userId.name.toLowerCase().includes(lower) ||
      t.userId.email.toLowerCase().includes(lower)
    );
    setFiltered(result);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeacher) {
      await axios.put(`http://localhost:5000/teachers/${selectedTeacher._id}`, selectedTeacher);
      setEditMode(false);
      setSelectedTeacher(null);
      fetchTeachers();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">👨‍🏫 Teachers List</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, email or ID"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          className="p-2 border rounded w-full max-w-md"
        />
        <button
          onClick={() => setShowAddForm(true)}
          className="ml-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          ➕ Add New Teacher
        </button>
      </div>

      {/* Add Teacher Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Teacher</h3>
            <AddTeacher onSuccess={() => {
              setShowAddForm(false);
              fetchTeachers();
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
        <p className="text-sm text-gray-500">Loading teachers...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Error: {error}</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Teacher ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Subjects</th>
              <th className="p-3">Joining Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{t.teacherID}</td>
                <td className="p-3">{t.userId.name}</td>
                <td className="p-3">{t.userId.email}</td>
                <td className="p-3">{t.subjects.join(', ')}</td>
                <td className="p-3">{new Date(t.joiningDate).toLocaleDateString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-white text-xs ${t.userId.status === 'active' ? 'bg-green-600' : 'bg-yellow-500'}`}>
                    {t.userId.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button onClick={() => { setSelectedTeacher(t); setEditMode(false); }} className="text-blue-600 hover:underline">View</button>
                  <button onClick={() => { setSelectedTeacher(t); setEditMode(true); }} className="text-purple-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* View/Edit Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editMode ? 'Edit Teacher' : 'Teacher Profile'}
            </h3>

            {editMode ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <input
                  type="text"
                  value={selectedTeacher.teacherID}
                  onChange={e => setSelectedTeacher({ ...selectedTeacher, teacherID: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={selectedTeacher.qualifications}
                  onChange={e => setSelectedTeacher({ ...selectedTeacher, qualifications: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="date"
                  value={selectedTeacher.joiningDate?.slice(0, 10)}
                  onChange={e => setSelectedTeacher({ ...selectedTeacher, joiningDate: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={selectedTeacher.subjects.join(', ')}
                  onChange={e => setSelectedTeacher({ ...selectedTeacher, subjects: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full p-2 border rounded"
                />
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-2 text-sm">
                <p><strong>Teacher ID:</strong> {selectedTeacher.teacherID}</p>
                <p><strong>Name:</strong> {selectedTeacher.userId.name}</p>
                <p><strong>Email:</strong> {selectedTeacher.userId.email}</p>
                <p><strong>Subjects:</strong> {selectedTeacher.subjects.join(', ')}</p>
                <p><strong>Joining Date:</strong> {new Date(selectedTeacher.joiningDate).toLocaleDateString()}</p>
                <p><strong>Qualifications:</strong> {selectedTeacher.qualifications}</p>
                <p><strong>Status:</strong> {selectedTeacher.userId.status}</p>
              </div>
            )}

            <button onClick={() => setSelectedTeacher(null)} className="mt-4 text-gray-600 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersList;