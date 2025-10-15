import express from 'express';
import { createExam, updateExam, getExams, getExamById, deleteExam } from '../controllers/exam.controller';

const router = express.Router();

router.post('/', createExam);
router.get('/', getExams);
router.get('/:id', getExamById);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;
