import { Types } from "mongoose";

// interfaces/Subject.ts
export interface ISubject {
  _id?: string;
  name: string;
  code: String;
  assignedTeacherIds: Types.ObjectId[];
}
