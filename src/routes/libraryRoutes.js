import { Router } from "express";
import { getBooks, getFines } from "../controllers/libraryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// GET /api/library/books
router.get("/books", protect, getBooks);

// GET /api/library/fines - mock fines calculation
router.get("/fines", protect, getFines);

export default router;
