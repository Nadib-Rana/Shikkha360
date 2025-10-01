import express from 'express';
import {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from '../controllers/assignment.controller';

const router = express.Router();

// GET all assignments
router.get('/', getAssignments);

// GET single assignment by ID
router.get('/:id', getAssignmentById);

// POST new assignment
router.post('/', createAssignment);

// PATCH update assignment
router.patch('/:id', updateAssignment);

// DELETE assignment
router.delete('/:id', deleteAssignment);

export default router;