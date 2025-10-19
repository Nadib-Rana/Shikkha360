import React from 'react';

interface User {
  id?: string | number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin' | string;
  status?: string;
  createdAt: string | number | Date;
}

interface Props {
  user: User;
  editMode: boolean;
  onClose: () => void;
  onChange: (updated: User) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const UserModal: React.FC<Props> = ({ user, editMode, onClose, onChange, onSubmit }) => (
  <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{editMode ? 'Edit User' : 'User Details'}</h3>
      {editMode ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            value={user.name}
            onChange={e => onChange({ ...user, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            value={user.email}
            onChange={e => onChange({ ...user, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <select
            value={user.role}
            onChange={e => onChange({ ...user, role: e.target.value as User['role'] })}
            className="w-full p-2 border rounded"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        </div>
      )}
      <button onClick={onClose} className="mt-4 text-gray-600 hover:underline">Close</button>
    </div>
  </div>
);

export default UserModal;