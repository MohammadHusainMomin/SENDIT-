import express from "express";
import {
  verifyAdmin,
  getDashboardStats,
  getMonthlyTrend,
  getRecentActivity,
  getUsersList,
  getFileDetails,
  getCodeDetails
} from "../controllers/admin.controller.js";

const router = express.Router();

// Admin verification
router.post("/verify", verifyAdmin);

// Dashboard stats
router.get("/stats", getDashboardStats);

// Monthly trend data
router.get("/trend", getMonthlyTrend);

// Recent activity
router.get("/activity", getRecentActivity);

// Users management
router.get("/users", getUsersList);

// Files details
router.get("/files", getFileDetails);

// Codes details
router.get("/codes", getCodeDetails);

export default router;
