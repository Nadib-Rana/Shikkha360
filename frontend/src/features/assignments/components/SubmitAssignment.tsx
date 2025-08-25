import React, { useState } from "react";
import useAssignment from "../hooks/useAssignment";

interface Props {
  assignmentId: string;
  userId: string;
  classId?: string;
}

const SubmitAssignment: React.FC<Props> = ({ assignmentId, userId, classId }) => {
  const { submitAssignment } = useAssignment({ role: "student", userId, classId });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to submit");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      await submitAssignment(assignmentId, file);
      setMessage("Assignment submitted successfully!");
      setFile(null);
    } catch (err: any) {
      setMessage(err.message || "Failed to submit assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Submit Assignment</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  );
};

export default SubmitAssignment;
