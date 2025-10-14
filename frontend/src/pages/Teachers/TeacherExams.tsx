import ExamList from '../../components/Exams/ExamList';
import RoleGuard from '../../components/shared/RoleGuard';

export default function TeacherExams() {
  return (
    <RoleGuard role="teacher" allowed={['teacher']}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Class Exams</h1>
        <ExamList />
      </div>
    </RoleGuard>
  );
}