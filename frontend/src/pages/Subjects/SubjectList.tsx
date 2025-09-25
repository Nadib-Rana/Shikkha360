import React from 'react';
import Layout from '../../components/layout/Layout';

interface Subject {
  id: number;
  name: string;
  code: string;
  class: string;
}

const subjects: Subject[] = [
  { id: 1, name: 'Mathematics', code: 'MATH101', class: 'Class 3' },
  { id: 2, name: 'English', code: 'ENG102', class: 'Class 4' },
  { id: 3, name: 'Science', code: 'SCI103', class: 'Class 5' }
];

const SubjectList: React.FC = () => {
  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Subject List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-2">Subject Name</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Class</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id} className="border-b text-sm text-gray-700 hover:bg-gray-50">
                <td className="px-4 py-2">{subject.name}</td>
                <td className="px-4 py-2">{subject.code}</td>
                <td className="px-4 py-2">{subject.class}</td>
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

export default SubjectList;