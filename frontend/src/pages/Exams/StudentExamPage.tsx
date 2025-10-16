import React from "react";
import ExamList from "../../components/Exams/ExamList";
interface User {
  _id: string;
  name: string;
  email?: string;
  role: "student";
  // Add other properties as needed
}

interface TeacherExamPageProps {
  user: User;
}
const StudentExamPage:React.FC<TeacherExamPageProps> = ({ user }) => {
  return <ExamList user={user} />;
};

export default StudentExamPage;
