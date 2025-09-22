// interfaces/Class.ts
import { Types } from 'mongoose';
export interface IClass {
  _id?: string;
  gradeLevel: string;
  section: string;
  classTeacherId: Types.ObjectId;
  subjectIds: string[];
}