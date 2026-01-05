/**
 * Use case: Sync Firebase user with backend database
 */
import User from "../models/User.js";

export const syncUser = async (req, res) => {
  try {
    const { uid, email, name } = req.user; // From Firebase token

    // Check if user already exists
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      // Create new user in DB
      user = await User.create({ firebaseUid: uid, email, name });
    }

    res.status(200).json({
      success: true,
      message: "User synced successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Sync failed" });
  }
};
