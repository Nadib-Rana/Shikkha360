// models/Subject

import mongoose , {Schema} from "mongoose";
import { ISubject } from "../interfaces/Subject";
const subjectSchema = new Schema<ISubject>({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String
  },
  assignedTeacherIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ]
});
export default mongoose.model<ISubject>('Subject',subjectSchema);