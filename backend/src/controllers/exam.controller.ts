import { Request, Response } from 'express';
import Exam from '../models/Exam';

// Create a new exam
export const createExam = async (req: Request, res: Response) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (error: any) {
    console.error('Create Exam Error:', error.message);
    res.status(500).json({ message: 'Failed to create exam', error: error.message });
  }
};

// Update an existing exam
export const updateExam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedExam = await Exam.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedExam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json(updatedExam);
  } catch (error: any) {
    console.error('Update Exam Error:', error.message);
    res.status(500).json({ message: 'Failed to update exam', error: error.message });
  }
};

// Get all exams
export const getExams = async (req: Request, res: Response) => {
  try {
    const exams = await Exam.find()
      .populate('classId', 'gradeLevel section')
      .populate('subjectId', 'name code')
      .populate('createdBy', 'name email');

    res.status(200).json(exams);
  } catch (error: any) {
    console.error('Get Exams Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch exams', error: error.message });
  }
};

// Get exam by ID
export const getExamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id)
      .populate('classId', 'gradeLevel section')
      .populate('subjectId', 'name code')
      .populate('createdBy', 'name email');

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json(exam);
  } catch (error: any) {
    console.error('Get Exam By ID Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch exam', error: error.message });
  }
};

// Delete an exam
export const deleteExam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedExam = await Exam.findByIdAndDelete(id);

    if (!deletedExam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json({ message: 'Exam deleted successfully', exam: deletedExam });
  } catch (error: any) {
    console.error('Delete Exam Error:', error.message);
    res.status(500).json({ message: 'Failed to delete exam', error: error.message });
  }
};
