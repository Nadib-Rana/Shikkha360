import express  from "express";
import { createExam,updateExam } from "../controllers/exam.controller";

const router = express.Router();

router.post("/",createExam);
router.patch("/exams/:id",updateExam);

export default router;