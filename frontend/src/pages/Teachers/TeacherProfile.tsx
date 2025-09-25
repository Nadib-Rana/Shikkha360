import React from 'react';
import Layout from '../../components/layout/Layout';

const teacher = {
  id: 1,
  name: 'Farzana Rahman',
  email: 'farzana@school.com',
  subject: 'Mathematics',
  phone: '01712345678',
  address: 'Uttara, Dhaka',
  photoUrl: 'https://via.placeholder.com/100' // Replace with actual image URL
};

const TeacherProfile: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Teacher Profile</h2>

        <div className="flex items-center gap-6 mb-6">
          <img
            src={teacher.photoUrl}
            alt={teacher.name}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{teacher.name}</h3>
            <p className="text-sm text-gray-500">{teacher.email}</p>
            <p className="text-sm text-gray-500">{teacher.subject}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <span className="font-medium">Phone:</span> {teacher.phone}
          </div>
          <div>
            <span className="font-medium">Address:</span> {teacher.address}
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-400 italic text-center">
          Make sure in one life.
        </div>
      </div>
    </Layout>
  );
};

export default TeacherProfile;