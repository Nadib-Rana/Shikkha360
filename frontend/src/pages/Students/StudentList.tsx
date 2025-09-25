import React from 'react';
import Layout from '../../components/layout/Layout';

interface Student {
  id: number;
  name: string;
  email: string;
  class: string;
  dob: string;
}

const students: Student[] = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    email: 'ayesha@student.com',
    class: 'Class 3',
    dob: '12/04/2015'
  },
  {
    id: 2,
    name: 'Rafiul Islam',
    email: 'rafiul@student.com',
    class: 'Class 5',
    dob: '08/11/2013'
  },
  {
    id: 3,
    name: 'Mehedi Hasan',
    email: 'mehedi@student.com',
    class: 'Class 4',
    dob: '23/06/2014'
  }
];

const StudentList: React.FC = () => {
  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Student List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b text-sm text-gray-700 hover:bg-gray-50">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">{student.class}</td>
                <td className="px-4 py-2">{student.dob}</td>
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

export default StudentList;