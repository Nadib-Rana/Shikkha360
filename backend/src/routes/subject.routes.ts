import express from "express"
import { createSubject , getSubject } from "../controllers/subject.controller"

const router = express.Router();

router.post("/",createSubject);
router.get('/_id', getSubject);

export default router;