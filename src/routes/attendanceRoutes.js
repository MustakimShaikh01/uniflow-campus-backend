import { Router } from "express";
import { getAttendance, markAttendance, editAttendance } from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// GET /api/attendance
router.get("/", protect, getAttendance);

// POST /api/attendance
router.post("/", protect, markAttendance);

// PUT /api/attendance/:id
router.put("/:id", protect, editAttendance);

export default router;
