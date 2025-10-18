import express from "express";
import {
  createExam,
  updateExam,
  getExams,
  getExamById,
  deleteExam,
} from "../controllers/exam.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = express.Router();

/**
 * ✅ Role Permissions:
 * - Admin: create, update, delete, view
 * - Teacher: create, view
 * - Student & Parent: view only
 */

// 🧾 Create Exam → শুধুমাত্র Admin এবং Teacher
router.post("/", authMiddleware, authorizeRoles("admin", "teacher"), createExam);

// 📋 Get All Exams → সবাই (admin, teacher, student, parent)
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "teacher", "student", "parent"),
  getExams
);

// 🔍 Get Exam By ID → সবাই (admin, teacher, student, parent)
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "teacher", "student", "parent"),
  getExamById
);

//  Update Exam → শুধুমাত্র Admin
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateExam);

//  Delete Exam → শুধুমাত্র Admin
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteExam);

export default router;
