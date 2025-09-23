import express from 'express';
import { markAttendance, getAttendanceByUser } from '../controllers/attendance.controller';

const router = express.Router();

router.post('/mark', markAttendance);
router.get('/user/:userId', getAttendanceByUser);

export default router;