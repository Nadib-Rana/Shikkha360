import express from "express"
import { createSubject , getAllSubject, getSubject } from "../controllers/subject.controller"

const router = express.Router();

router.post("/",createSubject);
router.get("/",getAllSubject);
router.get('/_id', getSubject);

export default router;