import express from 'express';
import {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  toggleTeacherStatus,
  assignSubjectsAndClasses
} from '../controllers/teacher.controller';

const router = express.Router();

router.get('/', getTeachers);                  // All teachers
router.get('/:id', getTeacherById);            // Single teacher
router.post('/', createTeacher);               // Create
router.put('/:id', updateTeacher);             // Update
router.delete('/:id', deleteTeacher);          // Delete
router.patch('/:id/status', toggleTeacherStatus); // Suspend/Activate
router.patch('/:id/assign', assignSubjectsAndClasses); // Assign subjects/classes

export default router;