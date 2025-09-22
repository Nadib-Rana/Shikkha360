// interfaces/Result.ts
import { Types } from 'mongoose';
export interface IResult {
  _id?: string;
  examId: Types.ObjectId;
  studentId: Types.ObjectId;
  marks: number;
  grade?: string;
  comments?: string;
}