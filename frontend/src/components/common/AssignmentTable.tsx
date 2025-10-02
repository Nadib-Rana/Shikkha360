// components/common/AssignmentTable.tsx
import React from 'react';

export interface Assignment {
  _id: string;
  studentId:string;
  subject?: { name: string };
  dueDate: string;
  status: string;
  fileUrl?: string;
}

const AssignmentTable: React.FC<{ assignments: Assignment[] }> = ({ assignments }) => (
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
      {assignments.map(a => (
        <tr key={a._id} className="border-t hover:bg-gray-50">
          <td className="p-3">{a.subject?.name || '—'}</td>
          <td className="p-3">{new Date(a.dueDate).toLocaleDateString()}</td>
          <td className="p-3">{a.status}</td>
          <td className="p-3">
            {a.fileUrl ? (
              <a href={`http://localhost:5000${a.fileUrl}`} target="_blank" className="text-blue-600 underline">Download</a>
            ) : (
              <span className="text-gray-500">No file</span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AssignmentTable;