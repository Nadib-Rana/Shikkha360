import { useEffect, useState } from "react";
import { fetchResults, deleteResult } from "../services/resultService";
import type{ IResult } from "../../type/result";
import { useNavigate } from "react-router-dom";

const ResultList = () => {
  const [results, setResults] = useState<IResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults().then(res => setResults(res.data)).catch(console.error);
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this result?")) {
      await deleteResult(id);
      setResults(prev => prev.filter(r => r._id !== id));
    }
  };

  return (
    <div>
      <h2>📊 All Results</h2>
      <button onClick={() => navigate("/results/new")}>➕ Add New Result</button>
      <ul>
        {results.map(result => (
          <li key={result._id}>
            <strong>Student:</strong> {result.studentId} | <strong>Marks:</strong> {result.marks} | <strong>Grade:</strong> {result.grade}
            <button onClick={() => navigate(`/results/edit/${result._id}`)}>✏️ Edit</button>
            <button onClick={() => handleDelete(result._id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultList;