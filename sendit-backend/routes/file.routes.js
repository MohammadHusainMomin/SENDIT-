import express from "express";
import multer from "multer";
import {
  sendFile,
  receiveFile,
  getMyFiles,
  downloadFromHistory
} from "../controllers/file.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Guest send (no history)
router.post("/send", upload.single("file"), sendFile);

//  Logged-in send (history)
router.post("/send-auth", authMiddleware, upload.single("file"), sendFile);

//  Receive (must be logged-in to save history)
router.post("/receive", authMiddleware, receiveFile);

//  History
router.get("/files/my", authMiddleware, getMyFiles);

//  Download from history
router.get("/files/download/:id", authMiddleware, downloadFromHistory);

export default router;
