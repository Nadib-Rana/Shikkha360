import { Types } from "mongoose";

export interface IAssignment {
  subject: Types.ObjectId;
  sectionId:Types.ObjectId;
  classId:Types.ObjectId;
  studentIds:Types.ObjectId;
  fileUrl: {type: string;},
  dueDate: Date; 
  status: 'Pending' | 'Submitted' | 'Graded';
  createdAt?: string;
  updatedAt?: string;
}