import express from 'express';
import { createFeeRecord, getFeesByStudent } from '../controllers/fee.controller';

const router = express.Router();

router.post('/', createFeeRecord);
router.get('/student/:studentId', getFeesByStudent);

export default router;