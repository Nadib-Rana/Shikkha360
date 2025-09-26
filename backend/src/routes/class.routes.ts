import express from 'express';
import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass
} from '../controllers/class.controller';

const router = express.Router();

// ✅ Create a new class
router.post('/', createClass);

// ✅ Get all classes
router.get('/', getClasses);

// ✅ Get a class by ID
router.get('/:id', getClassById);

// ✅ Update a class
router.patch('/:id', updateClass);

// ✅ Delete a class
router.delete('/:id', deleteClass);

export default router;