import mongoose, { Schema, Document, Types } from 'mongoose';
import { IAssignment } from '../interfaces/Assignment';


interface AssignmentDocument extends IAssignment, Document {}

const assignmentSchema = new Schema<AssignmentDocument>(
  {
    subject: {type: Schema.Types.ObjectId,ref: 'Subject',required: true,},

    classId: { type: Schema.Types.ObjectId, ref: 'Class' },
  
    studentIds: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    
    fileUrl: {type: String},

    dueDate: {type: Date, required: true,},

    status: {type: String,enum: ['Pending', 'Submitted', 'Graded'],default: 'Pending',}},

  { timestamps: true }
);

export default mongoose.model<AssignmentDocument>('Assignment', assignmentSchema);