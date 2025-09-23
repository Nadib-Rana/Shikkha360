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
      ref: 'Teacher',
      required: true
    }
  ]
});
export default mongoose.model<ISubject>('subject',subjectSchema);