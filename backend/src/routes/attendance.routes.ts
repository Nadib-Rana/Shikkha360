import express from 'express';
import {
  markAttendance,
  getAttendanceByUser,
  updateAttendance
} from '../controllers/attendance.controller';

const router = express.Router();

// Mark attendance
router.post('/mark', markAttendance);

// Get attendance by user
router.get('/user/:userId', getAttendanceByUser);

// Update attendance by ID
router.patch('/:id', updateAttendance);

export default router;