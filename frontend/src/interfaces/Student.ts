export interface Student {
  _id: string;
  studentID: string;
  section: string;
  admissionDate: string;
  documents: string[];
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  classId: {
    _id: string;
    gradeLevel: string;
    section: string;
  };
  parentId: {
    _id: string;
    name: string;
    email: string;
  };
}
