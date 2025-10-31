export interface IResult {
  _id: string;
  examId: string;       
  studentId: string;    
  marks: number;
  grade?: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
}