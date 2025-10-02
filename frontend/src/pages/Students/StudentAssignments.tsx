import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Assignment {
  _id: string;
  subject: {
    _id: string;
    name: string;
    code: string;
    assignedTeacherIds: string[];
  };
  sectionId: string;
  classId: string;
  studentIds: string[];
  fileUrl: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  createdAt?: string;
  updatedAt?: string;
}

const StudentAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get<Assignment[]>("http://localhost:5000/assignments")
      .then((res) => {
        setAssignments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredAssignments =
    filterStatus === 'All'
      ? assignments
      : assignments.filter((a) => a.status === filterStatus);

  const paginated = filteredAssignments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-gray-500">লোড হচ্ছে...</p>
      ) : error ? (
        <p className="text-red-600">ত্রুটি: {error}</p>
      ) : (
        <>
          {/* Filter + Summary */}
          <div className="flex items-center justify-between mb-4">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setPage(1);
              }}
              className="p-2 border rounded"
            >
              <option value="All">সব Status</option>
              <option value="Pending">Pending</option>
              <option value="Submitted">Submitted</option>
              <option value="Graded">Graded</option>
            </select>

            <p className="text-sm text-gray-600">
              মোট: {assignments.length} | দেখানো হচ্ছে: {paginated.length}
            </p>
          </div>

          {/* Table */}
          {paginated.length === 0 ? (
            <p className="text-gray-600">এই Status অনুযায়ী কোনো অ্যাসাইনমেন্ট নেই।</p>
          ) : (
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
                {paginated.map((a) => (
                  <tr key={a._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{a.subject?.name || '—'}</td>
                    <td className="p-3">
                      {new Date(a.dueDate).toLocaleDateString('bn-BD', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          a.status === 'Pending'
                            ? 'bg-yellow-500'
                            : a.status === 'Submitted'
                            ? 'bg-blue-500'
                            : 'bg-green-600'
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {a.fileUrl ? (
                        <a
                          href={`http://localhost:5000${a.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-gray-500">No file</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          {filteredAssignments.length > itemsPerPage && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <button
                disabled={page * itemsPerPage >= filteredAssignments.length}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentAssignments;