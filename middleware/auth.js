import jwt from "jsonwebtoken";
import { User } from "../models/users.js"; // Ensure correct path to user model

export const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({ success: false, message: "No authorization token is sent with request" });
    }

    if (!req.headers.authorization.startsWith("Bearer")) {
      return res.status(400).json({ success: false, message: "Authorization token should be of Bearer type" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Login first" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    if (!req.user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    next();
  } catch (err) {
    console.error("Authentication error:", err); // Add this line to log the error
    res.status(500).json({ success: false, message: err.message });
  }
};

