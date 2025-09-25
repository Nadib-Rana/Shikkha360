import React from 'react';
import Layout from '../../components/layout/Layout';

interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
  phone: string;
}

const teachers: Teacher[] = [
  {
    id: 1,
    name: 'Farzana Rahman',
    email: 'farzana@school.com',
    subject: 'Mathematics',
    phone: '01712345678'
  },
  {
    id: 2,
    name: 'Rafiul Islam',
    email: 'rafiul@school.com',
    subject: 'English',
    phone: '01898765432'
  },
  {
    id: 3,
    name: 'Mehedi Hasan',
    email: 'mehedi@school.com',
    subject: 'Science',
    phone: '01911223344'
  }
];

const TeacherList: React.FC = () => {
  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Teacher List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="border-b text-sm text-gray-700 hover:bg-gray-50">
                <td className="px-4 py-2">{teacher.name}</td>
                <td className="px-4 py-2">{teacher.email}</td>
                <td className="px-4 py-2">{teacher.subject}</td>
                <td className="px-4 py-2">{teacher.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-xs text-gray-400 italic text-center">
          Make sure in one life.
        </div>
      </div>
    </Layout>
  );
};

export default TeacherList;