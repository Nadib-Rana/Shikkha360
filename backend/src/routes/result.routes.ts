import express from 'express';
import {
  createResult,
  updateResult
} from '../controllers/result.controller';

const router = express.Router();

// Create a result
router.post('/', createResult);

// Update a result by ID
router.patch('/:id', updateResult);

export default router;