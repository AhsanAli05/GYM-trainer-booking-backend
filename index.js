import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Config folder

dotenv.config();

const app = express();

// -------------------
// Middleware
// -------------------

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.0.107:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON parser
app.use(express.json());

// -------------------
// Routes
// -------------------
app.get("/", (req, res) => {
  res.status(200).send("Trainer Booking Backend is running 🚀");
});

// Modular routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/trainers", trainerRoutes);

// -------------------
// Start Server
// -------------------
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
