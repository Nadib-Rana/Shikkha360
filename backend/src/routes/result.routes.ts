import { Router } from "express";
import {
  createResult,
  getResults,
  getResultById,
  updateResult,
  deleteResult,
} from "../controllers/result.controller";

const router = Router();

/**
 * @route   POST /results
 * @desc    Create a new result
 * @access  Public (or add auth middleware if needed)
 */
router.post("/", createResult);

/**
 * @route   GET /results
 * @desc    Get all results
 * @access  Public
 */
router.get("/", getResults);

/**
 * @route   GET /results/:id
 * @desc    Get a single result by ID
 * @access  Public
 */
router.get("/:id", getResultById);

/**
 * @route   PUT /results/:id
 * @desc    Update a result by ID
 * @access  Public
 */
router.put("/:id", updateResult);

/**
 * @route   DELETE /results/:id
 * @desc    Delete a result by ID
 * @access  Public
 */
router.delete("/:id", deleteResult);

export default router;
