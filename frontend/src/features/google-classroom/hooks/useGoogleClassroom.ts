import { useState, useEffect } from "react";
import { fetchCourses } from "../services/googleClassroomAPI";

export const useGoogleClassroom = () => {
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses().then(data => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  return { courses, loading };
};
