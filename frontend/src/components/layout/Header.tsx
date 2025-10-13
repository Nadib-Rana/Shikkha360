import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  role: string;
  avatar?: string;
}

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get<User>('http://localhost:5000/auth/me') // adjust endpoint as needed
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="fixed w-full flex justify-between items-center bg-white border-b px-6 py-3 shadow z-50">
      <h2 className="text-2xl font-bold text-gray-700">Welcome, {user?.role }</h2>

      <div className="flex items-center space-x-4">
        <ul className="text-right">
          <li className="text-lg font-semibold text-gray-600">{user?.name || 'UserName'}</li>
          <li className="text-sm font-mono text-gray-500">UserID: {user?._id || '...'}</li>
        </ul>
        <img
          src={user?.avatar || 'https://avatars.githubusercontent.com/u/169526577?v=4'}
          alt="ProfileImg"
          className="w-10 h-10 border-2 border-gray-700 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Header;