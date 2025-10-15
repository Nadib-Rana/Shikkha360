export interface Exam {
  _id: string;
  title: string;
  type: string;
  date: string;
  classId?: { _id: string; gradeLevel: string; section?: string };
  subjectId?: { _id: string; name: string; code?: string };
  createdBy?: { _id: string; name: string; email?: string };
}
