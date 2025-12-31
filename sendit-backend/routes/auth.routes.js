import express from "express";
import {
  registerInit,
  verifyOtpAndRegister,
  loginUser,
  googleAuth,
  forgotPassword,
  resetPassword
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register-init", registerInit);
router.post("/verify-otp", verifyOtpAndRegister);
router.post("/login", loginUser);
router.post("/google", googleAuth);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
