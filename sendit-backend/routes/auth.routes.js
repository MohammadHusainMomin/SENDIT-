import express from "express";
import {
  registerUser,
  loginUser,
  googleAuth
} from "../controllers/auth.controller.js";
import cors from "cors";
const router = express.Router();
router.options("*", cors());

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);

export default router;
