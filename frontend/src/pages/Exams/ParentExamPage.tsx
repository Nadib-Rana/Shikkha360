import React from "react";
import ExamList from "../../components/Exams/ExamList";
interface User {
  _id: string;
  name: string;
  email?: string;
  role: "parent";
  // Add other properties as needed
}

interface TeacherExamPageProps {
  user: User;
}
const ParentExamPage: React.FC<TeacherExamPageProps> = ({ user }) => {
  return <ExamList user={user} />;
};

export default ParentExamPage;
