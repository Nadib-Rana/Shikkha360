import Exam from '../models/Exam';
import Result from '../models/Result';
import { Request, Response } from 'express';

export const createExam = async (req: Request, res: Response) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (error) {
    console.error('Create exam error:', error);
    res.status(500).json({ message: 'Failed to create exam' });
  }
};

export const getResultsByExam = async (req: Request, res: Response) => {
  try {
    const { examId } = req.params;
    const results = await Result.find({ examId }).populate('studentId');

    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'No results found for this exam' });
    }

    res.json(results);
  } catch (error) {
    console.error('Fetch results error:', error);
    res.status(500).json({ message: 'Failed to fetch results' });
  }
};

export const updateExam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedExam = await Exam.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedExam) {
      return res.status(404).json({ message: 'Exam record not found' });
    }

    res.json(updatedExam);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error while updating exam' });
  }
};