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