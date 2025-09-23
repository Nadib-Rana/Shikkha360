import express from 'express';
import { createExam, getResultsByExam } from '../controllers/exam.controller';

const router = express.Router();

router.post('/', createExam);
router.get('/results/:examId', getResultsByExam);

export default router;