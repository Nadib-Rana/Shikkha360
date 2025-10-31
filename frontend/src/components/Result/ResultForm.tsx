import { useState } from "react";
import type { IResult } from "../../type/result";

interface Props {
  initialData?: Partial<IResult>;
  onSubmit: (data: Partial<IResult>) => void;
}

const ResultForm = ({ initialData = {}, onSubmit }: Props) => {
  const [formData, setFormData] = useState<Partial<IResult>>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Exam ID:</label>
      <input name="examId" value={formData.examId || ""} onChange={handleChange} required />

      <label>Student ID:</label>
      <input name="studentId" value={formData.studentId || ""} onChange={handleChange} required />

      <label>Marks:</label>
      <input name="marks" type="number" value={formData.marks || ""} onChange={handleChange} required />

      <label>Grade:</label>
      <input name="grade" value={formData.grade || ""} onChange={handleChange} />

      <label>Comments:</label>
      <textarea name="comments" value={formData.comments || ""} onChange={handleChange} />

      <button type="submit">✅ Submit</button>
    </form>
  );
};

export default ResultForm;