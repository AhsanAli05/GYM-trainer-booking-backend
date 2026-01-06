import User from "../models/User.js";
import Trainer from "../models/Trainer.js";

/**
 * Use case: Sync Firebase user with backend database
 * Handles both initial registration and subsequent logins.
 */
export const syncUser = async (req, res) => {
  try {
    // 1. Extract data
    // uid and email come from the decoded token in your authMiddleware
    const { uid, email } = req.user;
    // name and role come from the React Native body
    const { name, role } = req.body;

    // 2. Find or Create the base User
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      console.log(`Creating new user: ${email} with role: ${role}`);
      user = await User.create({
        firebaseUid: uid,
        email,
        name: name || "New User",
        role: role || "user", // Default to user if not provided
      });
    }

    // 3. Handle Trainer Profile
    // We check this even if the user exists, in case the trainer
    // profile creation failed during the first attempt.
    let trainerProfile = null;
    if (user.role === "trainer") {
      trainerProfile = await Trainer.findOne({ userId: user._id });

      if (!trainerProfile) {
        console.log(`Initializing trainer profile for: ${user._id}`);
        trainerProfile = await Trainer.create({
          userId: user._id,
          specialty: [], // Initialize with defaults
          isVerified: false,
        });
      }
    }

    // 4. Return success with the merged user object
    return res.status(200).json({
      success: true,
      message: "User synced successfully",
      user: {
        ...user.toObject(),
        // We attach trainerData if it exists, so the app knows the profile status
        trainerProfile: trainerProfile || null,
      },
    });
  } catch (error) {
    console.error("Sync Error Details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during sync",
      error: error.message,
    });
  }
};
