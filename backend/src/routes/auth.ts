import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

// api/auth
const router = Router();

router.post("/register",authMiddleware, authorizeRoles("admin"), registerUser);
router.post("/login", loginUser);

export default router;
