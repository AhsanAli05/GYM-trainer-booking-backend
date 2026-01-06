import admin from "../config/firebase.js";

// Middleware to verify Firebase ID Token
const verifyFirebaseToken = async (req, res, next) => {
  try {
    // Get the token from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const idToken = authHeader.split("Bearer ")[1];

    // Verify the token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Attach user info to request object
    req.user = decodedToken;

    next(); // Continue to next middleware or route
  } catch (error) {
    console.error("Firebase token verification error:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

export default verifyFirebaseToken;
