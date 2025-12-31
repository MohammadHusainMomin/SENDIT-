import fs from "fs";
import File from "../models/File.js";
import { encryptFile, decryptFile } from "../utils/encryption.utils.js";

/* ================= SEND FILE ================= */
export const sendFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File missing" });

  const code = Math.floor(1000 + Math.random() * 9000).toString();

  const encryptedPath = `uploads/encrypted-${Date.now()}`;
 await encryptFile(req.file.path, encryptedPath);

  await File.create({
    code,
    encryptedPath,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    senderId: req.user?.id
  });

  res.json({ code });
};


/* ================= RECEIVE FILE ================= */
export const receiveFile = async (req, res) => {
  try {
    const { code } = req.body;

    const file = await File.findOne({ code });
    if (!file) return res.status(404).json({ message: "Invalid code" });

    if (new Date() > file.expiresAt) {
      return res.status(410).json({ message: "Code expired" });
    }

    if (!file.receiverId && req.user) {
      file.receiverId = req.user.id;
      await file.save();
    }

    const decryptedPath = `uploads/tmp-${Date.now()}`;

    // ✅ MUST await
    await decryptFile(file.encryptedPath, decryptedPath);

    // ✅ Correct filename + mime
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(file.originalName)}"`
    );
    res.setHeader("Content-Type", file.mimeType);

    res.download(decryptedPath, file.originalName, (err) => {
      if (err) console.error("DOWNLOAD ERROR:", err);

      // ✅ SAFE DELETE (NO CRASH)
      if (fs.existsSync(decryptedPath)) {
        fs.unlink(decryptedPath, () => {});
      }
    });

  } catch (err) {
    console.error("RECEIVE ERROR:", err);
    res.status(500).json({ message: "Download failed" });
  }
};



/* ================= HISTORY ================= */
export const getMyFiles = async (req, res) => {
  const userId = req.user.id;

  const files = await File.find({
    $or: [{ senderId: userId }, { receiverId: userId }]
  }).sort({ createdAt: -1 });

  res.json(files);
};

/* ================= DOWNLOAD FROM HISTORY ================= */
export const downloadFromHistory = async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.sendStatus(404);

  if (
    file.senderId.toString() !== req.user.id &&
    file.receiverId?.toString() !== req.user.id
  ) return res.sendStatus(403);

  const decryptedPath = `uploads/tmp-${Date.now()}`;

  // ✅ MUST await
  await decryptFile(file.encryptedPath, decryptedPath);

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${encodeURIComponent(file.originalName)}"`
  );
  res.setHeader("Content-Type", file.mimeType);

  res.download(decryptedPath, file.originalName, (err) => {
    if (err) console.error(err);

    if (fs.existsSync(decryptedPath)) {
      fs.unlink(decryptedPath, () => {});
    }
  });
};
