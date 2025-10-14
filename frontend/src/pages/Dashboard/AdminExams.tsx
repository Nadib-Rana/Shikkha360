import ExamList from '../../components/exams/ExamList';
import ExamForm from '../../components/exams/ExamForm';
import RoleGuard from '../../components/shared/RoleGuard';

export default function AdminExams() {
  return (
    <RoleGuard role="admin" allowed={['admin']}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Exams</h1>
        <ExamForm />
        <ExamList />
      </div>
    </RoleGuard>
  );
}