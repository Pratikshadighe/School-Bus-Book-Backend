import express from "express";
import {
  login,
  register,
  logout,
  updatePassword,
  forgetPassword,
  resetPassword,
  getMyProfile,
 
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/updatepassword").put(isAuthenticated, updatePassword);
router.route("/me").get(isAuthenticated,getMyProfile);

router.route("/forgotpassword").post(forgetPassword);
router.route("/resetpassword").put(resetPassword);


export default router;
