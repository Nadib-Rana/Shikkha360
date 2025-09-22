// interfaces/Teacher.ts
import { Types } from 'mongoose';
export interface ITeacher {
  _id?: string;
  userId: Types.ObjectId;
  teacherID: string;
  subjects: string[];
  classIds: string[];
  joiningDate: Date;
  qualifications?: string;
}