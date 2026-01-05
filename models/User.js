/**
 * Use case: Store Firebase-authenticated users in MongoDB
 */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    name: String,
    email: String,
    role: { type: String, default: "user" }, // user | trainer
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
