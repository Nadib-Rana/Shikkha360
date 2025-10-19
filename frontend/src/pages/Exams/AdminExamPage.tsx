import React from "react";
import ExamList from "../../components/Exams/ExamList";
interface User {
  _id: string;
  name: string;
  email?: string;
  role: "admin" ;
}

interface AdminExamPageProps {
  user: User;
}
 const AdminExamPage: React.FC<AdminExamPageProps> = ({ user }) => {
   return <ExamList canCreate={true} canEdit={true} canDelete={true}  {...({ user } as any)}/>
}

export default AdminExamPage;
