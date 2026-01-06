import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js"; // DB connection
// import authenticate from "./middleware/auth.js"; // Firebase token middleware

// Import routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

// -------------------
// Middleware
// -------------------

// CORS configuration - allow frontend URLs
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.107:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON parser
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Trainer Booking Backend is running 🚀");
});

// Test Firebase Admin
// app.get("/api/test-firebase", async (req, res) => {
//   try {
//     res.status(200).json({
//       success: true,
//       message: "Firebase Admin is working! 🚀",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// });

// Protected test route
// app.get("/api/protected", authenticate, (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "You have accessed a protected route!",
//     user: req.user,
//   });
// });

// Sync Firebase user with MongoDB
app.use("/api/auth", authRoutes);

// User-related APIs
app.use("/api/users", userRoutes);

// Future routes
// app.use("/api/trainers", trainerRoutes);
// app.use("/api/bookings", bookingRoutes);

// Start Server

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const startServer = async () => {
  try {
    await connectDB(); // Wait for DB connection
    app.listen(PORT, HOST, () => {
      console.log("====================================");
      console.log("✅ Server Started Successfully");
      console.log(`Localhost: http://localhost:${PORT}`);
      console.log(`Network: http://${HOST}:${PORT}`);
      console.log("====================================");
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
