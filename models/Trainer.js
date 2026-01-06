import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialty: { type: [String], default: [] },
    bio: { type: String, default: "" },
    experienceYears: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Trainer", trainerSchema);
