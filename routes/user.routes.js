// src/routes/user.routes.js
import express from "express";
import verifyFirebaseToken from "../middleware/auth.js";

const router = express.Router();

// Example protected route: get current user info
router.get("/me", verifyFirebaseToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "User info retrieved successfully",
    user: req.user, // Comes from Firebase token
  });
});

export default router;
