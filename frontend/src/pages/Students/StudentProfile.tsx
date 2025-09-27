import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, data } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../../components/common/BackButton';
import Student from './Student';

interface Student {
  _id: string;
  studentID: string;
  section: string;
  admissionDate: string;
  documents: string[];
  createdAt: string;
  updatedAt: string;
  userId?: any;
  classId?: any;
  parentId?: any;
  photoUrl?: string;
}

const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<{data: Student}>(`http://localhost:5000/students/${id}`)
      .then((response) => {
        setStudent(response.data.data || response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Student not found or server error');
        setLoading(false);
      });
  }, [id]);

  return (
   
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-8">
        {/* Back Button */}
         <BackButton />

        <h2 className="text-xl font-semibold text-gray-700 mb-6">Student Profile</h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading profile...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : student ? (
          <>
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-6">
              <img
                src={student.photoUrl || 'https://via.placeholder.com/100'}
                alt={student.studentID}
                className="w-24 h-24 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{student.studentID}</h3>
                <p className="text-sm text-gray-500">Section: {student.section}</p>
                <p className="text-sm text-gray-500">
                  Admission: {new Date(student.admissionDate).toLocaleDateString('en-GB')}
                </p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="font-medium">Documents:</span>{' '}
                {student.documents?.length
                  ? student.documents.join(', ')
                  : 'No documents uploaded'}
              </div>
              <div>
                <span className="font-medium">Created At:</span>{' '}
                {new Date(student.createdAt).toLocaleString('en-GB')}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span>{' '}
                {new Date(student.updatedAt).toLocaleString('en-GB')}
              </div>
              <div>
                <span className="font-medium">Class ID:</span>{' '}
                {student.classId?._id || 'Not assigned'}
              </div>
              <div>
                <span className="font-medium">Parent ID:</span>{' '}
                {student.parentId?._id || 'Not assigned'}
              </div>
              <div>
                <span className="font-medium">User ID:</span>{' '}
                {student.userId?._id || 'Not linked'}
              </div>
            </div>
          </>
        ) : null}

        <div className="mt-6 text-xs text-gray-400 italic text-center">
          Make sure in one life.
        </div>
      </div>
  );
};

export default StudentProfile;