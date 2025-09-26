import Exam from '../models/Exam';
import Result from '../models/Result';
import { Request, Response } from 'express';

export const createExam = async (req: Request, res: Response) => {
  const exam = await Exam.create(req.body);
  res.status(201).json(exam);
};

export const getResultsByExam = async (req: Request, res: Response) => {
  const { examId } = req.params;
  const results = await Result.find({ examId }).populate('studentId');
  res.json(results);
};


export const updateExam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateExam = req.body;

    const updatedAttendance = await Exam.findByIdAndUpdate(
      id,
      updateExam,
      { new: true } 
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.json(updatedAttendance);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error while updating attendance' });
  }
};