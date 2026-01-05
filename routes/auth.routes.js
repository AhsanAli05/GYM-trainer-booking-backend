/**
 * Use case: Authentication related routes
 */
import express from "express";
import authMiddleware from "../middleware/auth.js";
import { syncUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Sync Firebase user to MongoDB
router.post("/sync", authMiddleware, syncUser);

export default router;
