import mongoose, { Schema, Document } from 'mongoose';
import { ISection } from "../interfaces/Section"
const sectionSchema = new Schema<ISection>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    classTeacherId: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    subjectIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ISection>('Section', sectionSchema);