// routes/examRoutes.ts
import { Router } from 'express';
import {
  createExam,
  updateExam,
  getExams,
  getExamById
} from '../controllers/exam.controller';

const router = Router();

// Create a new exam
router.post('/', createExam);

// Update an existing exam by ID
router.put('/:id', updateExam);

// Get all exams
router.get('/', getExams);

// Get a specific exam by ID
router.get('/:id', getExamById);

export default router;