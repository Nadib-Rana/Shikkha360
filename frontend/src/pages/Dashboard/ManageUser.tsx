import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Register from '../Auth/Register';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  status: 'active' | 'inactive';
  createdAt: string;
}

const ManageUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const fetchUsers = () => {
    axios.get<User[]>('http://localhost:5000/users')
      .then(res => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u =>
    (roleFilter ? u.role === roleFilter : true) &&
    (search ? u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search) : true)
  );

  const handleSuspend = async (user: User) => {
    const updatedStatus = user.status === 'active' ? 'inactive' : 'active';
    await axios.put(`http://localhost:5000/users/${user._id}`, { status: updatedStatus });
    fetchUsers();
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      await axios.put(`http://localhost:5000/users/${selectedUser._id}`, selectedUser);
      setEditMode(false);
      setSelectedUser(null);
      fetchUsers();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">👥 Manage Users</h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
        >
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Register Button */}
      <div className="mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowRegister(true)}
        >
          ➕ Add New User
        </button>
      </div>

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Register New User</h3>
            <Register />
            <button
              onClick={() => setShowRegister(false)}
              className="mt-4 text-gray-600 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Created</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(u => (
            <tr key={u._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-white text-xs ${u.status === 'active' ? 'bg-green-600' : 'bg-yellow-500'}`}>
                  {u.status}
                </span>
              </td>
              <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
              <td className="p-3 space-x-2">
                <button onClick={() => { setSelectedUser(u); setEditMode(false); }} className="text-blue-600 hover:underline">View</button>
                <button onClick={() => { setSelectedUser(u); setEditMode(true); }} className="text-purple-600 hover:underline">Edit</button>
                <button onClick={() => handleSuspend(u)} className="text-red-600 hover:underline">
                  {u.status === 'active' ? 'Suspend' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editMode ? 'Edit User' : 'User Details'}
            </h3>

            {editMode ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <select
                  value={selectedUser.role}
                  onChange={e => setSelectedUser({ ...selectedUser, role: e.target.value as User['role'] })}
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
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>Status:</strong> {selectedUser.status}</p>
                <p><strong>Created:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              </div>
            )}

            <button onClick={() => setSelectedUser(null)} className="mt-4 text-gray-600 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;