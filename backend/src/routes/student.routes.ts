import express from 'express';
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/student.controller';

const router = express.Router();

// ✅ Create a new student
router.post('/', createStudent);

// ✅ Get all students
router.get('/', getStudents);

// ✅ Get a student by ID
router.get('/:id', getStudentById);

// ✅ Update a student
router.patch('/:id', updateStudent);

// ✅ Delete a student
router.delete('/:id', deleteStudent);

export default router;