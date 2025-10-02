// interfaces/Student.ts
import { Types } from 'mongoose';
export interface IStudent {
  _id?: string;
  userId: Types.ObjectId;
  studentID: string;
  classId: Types.ObjectId;
  section: string;
  admissionDate: Date;
  parentId: Types.ObjectId;
  documents?: string[];
}