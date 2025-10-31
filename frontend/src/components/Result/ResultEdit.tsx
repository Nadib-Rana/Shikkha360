import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchResultById, updateResult } from "../services/resultService";
import ResultForm from "./ResultForm";
import { IResult } from "../types/result";

const ResultEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<IResult | null>(null);

  useEffect(() => {
    if (id) {
      fetchResultById(id).then(res => setResult(res.data)).catch(console.error);
    }
  }, [id]);

  const handleUpdate = async (data: Partial<IResult>) => {
    if (id) {
      await updateResult(id, data);
      navigate("/results");
    }
  };

  return (
    <div>
      <h2>✏️ Edit Result</h2>
      {result ? <ResultForm initialData={result} onSubmit={handleUpdate} /> : <p>Loading...</p>}
    </div>
  );
};

export default ResultEdit;