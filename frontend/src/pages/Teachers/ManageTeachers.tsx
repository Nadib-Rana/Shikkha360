import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Teacher {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
  teacherID: string;
  subjects?: string[];
  classIds?: string[];
  assignmentCount?: number;
  lastAssignmentDate?: string;
  feedbackScore?: number;
  attendanceRate?: number;
  joiningDate?: string;
  qualifications?: string;
}

const ManageTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selected, setSelected] = useState<Teacher | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Teacher[]>('http://localhost:5000/teachers');
      setTeachers(res.data);
    } catch {
      setError('Failed to load teachers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.email.includes(search)
  );
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleStatusToggle = async (t: Teacher) => {
    await axios.patch(`http://localhost:5000/teachers/${t._id}/status`);
    fetchTeachers();
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) {
      await axios.put(`http://localhost:5000/teachers/${selected._id}`, selected);
      setEditMode(false);
      setSelected(null);
      fetchTeachers();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">👨‍🏫 Teacher Management</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />

      {loading ? (
        <p className="text-gray-500">Loading teachers...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Subjects</th>
                <th className="p-3">Classes</th>
                <th className="p-3">Assignments</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(t => (
                <tr key={t._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{t.name}</td>
                  <td className="p-3">{t.email}</td>
                  <td className="p-3">{t.subjects?.join(', ') || '—'}</td>
                  <td className="p-3">{t.classIds?.length || 0}</td>
                  <td className="p-3">{t.assignmentCount ?? 0}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-white text-xs ${
                      t.status === 'active' ? 'bg-green-600' : 'bg-yellow-500'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => { setSelected(t); setEditMode(false); }} className="text-blue-600 hover:underline">View</button>
                    <button onClick={() => { setSelected(t); setEditMode(true); }} className="text-purple-600 hover:underline">Edit</button>
                    <button onClick={() => handleStatusToggle(t)} className="text-red-600 hover:underline">
                      {t.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: Math.ceil(filtered.length / pageSize) }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editMode ? 'Edit Teacher' : 'Teacher Profile'}
            </h3>

            {editMode ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <input
                  type="text"
                  value={selected.name}
                  onChange={e => setSelected({ ...selected, name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  value={selected.email}
                  onChange={e => setSelected({ ...selected, email: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <select
                  value={selected.subjects?.[0] || ''}
                  onChange={e => setSelected({ ...selected, subjects: [e.target.value] })}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Subject</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                </select>
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {selected.name}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Phone:</strong> {selected.phone || '—'}</p>
                <p><strong>Teacher ID:</strong> {selected.teacherID}</p>
                <p><strong>Joining Date:</strong> {selected.joiningDate ? new Date(selected.joiningDate).toLocaleDateString() : '—'}</p>
                <p><strong>Qualifications:</strong> {selected.qualifications || '—'}</p>
                <p><strong>Subjects:</strong> {selected.subjects?.join(', ') || '—'}</p>
                <p><strong>Classes:</strong> {selected.classIds?.length || 0}</p>
                <div className="flex gap-2 text-xs mt-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Assignments: {selected.assignmentCount ?? 0}</span>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Feedback: {selected.feedbackScore ?? '—'}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Attendance: {selected.attendanceRate ? `${selected.attendanceRate}%` : '—'}</span>
                </div>
              </div>
            )}

            <button onClick={() => setSelected(null)} className="mt-4 text-gray-600 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTeachers;