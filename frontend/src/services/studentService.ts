// src/services/studentService.ts
import axios from "axios";

export interface StudentRegistrationResponse {
  id: string;
  message: string;
}

export async function registerStudent(form: FormData) {
  // Change base URL if needed or move axios config into a central api.ts
  const res = await axios.post<StudentRegistrationResponse>(
    "/api/students/signup",
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
}
