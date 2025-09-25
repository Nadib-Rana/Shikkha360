import React from 'react';
import Layout from '../../components/layout/Layout';

const student = {
  id: 1,
  name: 'Ayesha Rahman',
  email: 'ayesha@student.com',
  class: 'Class 3',
  dob: '12/04/2015',
  guardian: 'Farzana Rahman',
  phone: '01712345678',
  address: 'Uttara, Dhaka',
  photoUrl: 'https://via.placeholder.com/100' // Replace with actual image URL
};

const StudentProfile: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Student Profile</h2>

        <div className="flex items-center gap-6 mb-6">
          <img
            src={student.photoUrl}
            alt={student.name}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
            <p className="text-sm text-gray-500">{student.email}</p>
            <p className="text-sm text-gray-500">{student.class}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <span className="font-medium">Date of Birth:</span> {student.dob}
          </div>
          <div>
            <span className="font-medium">Guardian:</span> {student.guardian}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {student.phone}
          </div>
          <div>
            <span className="font-medium">Address:</span> {student.address}
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-400 italic text-center">
          Make sure in one life.
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;