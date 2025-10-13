import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddStudent from './AddStudent';

interface Student {
  _id: string;
  studentID: string;
  section: string;
  admissionDate: string;
  documents: string[];
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  classId: {
    _id: string;
    gradeLevel: string;
    section: string;
  };
  parentId: {
    _id: string;
    name: string;
    email: string;
  };
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = () => {
    axios.get<Student[]>('http://localhost:5000/students')
      .then(res => {
        setStudents(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = (query: string) => {
    const lower = query.toLowerCase();
    const result = students.filter(s =>
      s.studentID.toLowerCase().includes(lower) ||
      s.section.toLowerCase().includes(lower) ||
      s.userId.name.toLowerCase().includes(lower) ||
      s.classId.gradeLevel.toLowerCase().includes(lower)
    );
    setFiltered(result);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudent) {
      await axios.put(`http://localhost:5000/students/${selectedStudent._id}`, selectedStudent);
      setEditMode(false);
      setSelectedStudent(null);
      fetchStudents();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">🎓 Student List</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by ID, name, section or grade"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          className="p-2 border rounded w-full max-w-md"
        />
        <button
          onClick={() => setShowAddForm(true)}
          className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add New Student
        </button>
      </div>

      {/* Add Student Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Student</h3>
            <AddStudent onSuccess={() => {
              setShowAddForm(false);
              fetchStudents();
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
        <p className="text-sm text-gray-500">Loading students...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Error: {error}</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Student ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Section</th>
              <th className="p-3">Admission</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{s.studentID}</td>
                <td className="p-3">{s.userId.name}</td>
                <td className="p-3">{s.userId.email}</td>
                <td className="p-3">{s.classId.gradeLevel}</td>
                <td className="p-3">{s.section}</td>
                <td className="p-3">{new Date(s.admissionDate).toLocaleDateString()}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => { setSelectedStudent(s); setEditMode(false); }} className="text-blue-600 hover:underline">View</button>
                  <button onClick={() => { setSelectedStudent(s); setEditMode(true); }} className="text-green-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* View/Edit Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editMode ? 'Edit Student' : 'Student Profile'}
            </h3>

            {editMode ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <input
                  type="text"
                  value={selectedStudent.studentID}
                  onChange={e => setSelectedStudent({ ...selectedStudent, studentID: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={selectedStudent.section}
                  onChange={e => setSelectedStudent({ ...selectedStudent, section: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="date"
                  value={selectedStudent.admissionDate?.slice(0, 10) || ''}
                  onChange={e => setSelectedStudent({ ...selectedStudent, admissionDate: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-2 text-sm">
                <p><strong>Student ID:</strong> {selectedStudent.studentID}</p>
                <p><strong>Name:</strong> {selectedStudent.userId.name}</p>
                <p><strong>Email:</strong> {selectedStudent.userId.email}</p>
                <p><strong>Grade:</strong> {selectedStudent.classId.gradeLevel}</p>
                <p><strong>Section:</strong> {selectedStudent.section}</p>
                <p><strong>Admission Date:</strong> {new Date(selectedStudent.admissionDate).toLocaleDateString()}</p>
                <p><strong>Parent:</strong> {selectedStudent.parentId.name} ({selectedStudent.parentId.email})</p>
                <p><strong>Documents:</strong> {selectedStudent.documents.join(', ')}</p>
              </div>
            )}

            <button onClick={() => setSelectedStudent(null)} className="mt-4 text-gray-600 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;