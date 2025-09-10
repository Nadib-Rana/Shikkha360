import { useState, useEffect } from "react";
import axios from "axios";

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  classId: string;
  teacherId: string;
  fileUrl?: string;
}

interface UseAssignmentOptions {
  role: "student" | "teacher" | "admin";
  userId: string;
  classId?: string;
}

const useAssignment = ({ role, userId, classId }: UseAssignmentOptions) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch assignments from API
  const fetchAssignments = async () => {
    setLoading(true);
    setError("");
    try {
      let url = "/api/assignments";
      if (role === "student") url += `?studentId=${userId}`;
      if (role === "teacher") url += `?teacherId=${userId}`;
      if (classId) url += `&classId=${classId}`;

      const res = await axios.get<Assignment[]>(url);
      setAssignments(res.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch assignments");
    } finally {
      setLoading(false);
    }
  };

  // Submit assignment (for students)
  const submitAssignment = async (assignmentId: string, file: File) => {
    if (role !== "student") throw new Error("Only students can submit assignments");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`/api/assignments/${assignmentId}/submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Update local state if needed
      fetchAssignments();
      return res.data;
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message || "Failed to submit assignment");
    }
  };

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, userId, classId]);

  return { assignments, loading, error, fetchAssignments, submitAssignment };
};

export default useAssignment;
