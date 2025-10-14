// models/Class.ts
import mongoose, { Schema } from 'mongoose';
import { IClass } from '../interfaces/Class';

const ClassSchema = new Schema<IClass>({
  gradeLevel: {
     type: String, 
     required: true 
    },
  section:{ type: String} ,
  
  classTeacherId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Teacher' 
},
  subjectIds: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Subject' }],
}, { timestamps: true });

export default mongoose.model<IClass>('Class', ClassSchema);