import React, { useEffect, useState } from "react";
import axios from "axios";

interface Result {
  _id: string;
  studentName: string;
  subject: string;
  marks: number;
  grade: string;
}

const StudentResults: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:5000/results");
        // Optionally filter for current student if auth implemented
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 My Results</h2>
      {results.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <ul className="space-y-2">
          {results.map((r) => (
            <li
              key={r._id}
              className="border p-2 flex justify-between items-center"
            >
              <div>
                <p>Student: {r.studentName}</p>
                <p>Subject: {r.subject}</p>
                <p>Marks: {r.marks}</p>
                <p>Grade: {r.grade}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentResults;
