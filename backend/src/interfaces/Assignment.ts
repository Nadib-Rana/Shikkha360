import { Types } from "mongoose";

export interface IAssignment {
  subject: Types.ObjectId;
  dueDate: Date; 
  status: 'Pending' | 'Submitted' | 'Graded';
  createdAt?: string;
  updatedAt?: string;
}