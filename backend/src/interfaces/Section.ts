import { Types } from 'mongoose';

export interface ISection {
  name: string;
  classId: Types.ObjectId;
  classTeacherId?: Types.ObjectId;
  subjectIds?: Types.ObjectId[];
}