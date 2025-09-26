import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../../components/common/Table';
import Searching from '../../components/common/Scarching';
import BackButton from '../../components/common/BackButton';

interface Student {
  _id: string;
  userId: string;
  studentID: string;
  classId: string;
  section: string;
  admissionDate: string;
  parentId: string;
  documents: string[];
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Student[]>('http://localhost:5000/students')
      .then((response) => {
        setStudents(response.data);
        setFiltered(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query: string) => {
    const lower = query.toLowerCase();
    const result = students.filter(
      (s) =>
        s.studentID.toLowerCase().includes(lower) ||
        s.section.toLowerCase().includes(lower)
    );
    setFiltered(result);
  };

  const columns = [
    { header: 'Student ID', accessor: 'studentID' },
    { header: 'Section', accessor: 'section' },
    {
      header: 'Admission Date',
      accessor: 'admissionDate',
      Cell: (value: string) => new Date(value).toLocaleDateString('en-GB'),
    },
    {
      header: 'Documents',
      accessor: 'documents',
      Cell: (value: string[]) => value.join(', '),
    },
    {
      header: 'Actions',
      accessor: '_id',
      Cell: (id: string) => (
        <Link
          to={`/student-profile/${id}`}
          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700 transition"
        >
          👁️ View
        </Link>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <p><BackButton/></p>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Student List</h2>

      <Searching onSearch={handleSearch} placeholder="Search by ID or section" />

      {loading ? (
        <p className="text-sm text-gray-500">Loading students...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Error: {error}</p>
      ) : (
        <Table columns={columns} data={filtered} />
      )}

      <div className="mt-4 text-xs text-gray-400 italic text-center">
        Make sure in one life.Nadib Rana
      </div>
    </div>
  );
};

export default StudentList;