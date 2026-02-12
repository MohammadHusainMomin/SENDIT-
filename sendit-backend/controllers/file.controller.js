import fs from "fs";
import File from "../models/File.js";
import { encryptFile, decryptFile } from "../utils/encryption.utils.js";

/* ================= SEND FILE ================= */
export const sendFile = async (req, res) => {
  try {
    // Support both single file (req.file) and multiple files (req.files)
    const uploadedFiles = req.files || (req.file ? [req.file] : []);

    if (uploadedFiles.length === 0) {
      return res.status(400).json({ message: "No files provided" });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresIn = parseInt(req.query.expiresIn) || 10;

    // Encrypt all files and prepare file objects
    const fileObjects = [];

    for (const file of uploadedFiles) {
      const encryptedPath = `uploads/encrypted-${Date.now()}-${Math.random()}`;
      await encryptFile(file.path, encryptedPath);

      fileObjects.push({
        encryptedPath,
        originalName: file.originalname,
        mimeType: file.mimetype
      });
    }

    // Create single document with all files
    await File.create({
      code,
      files: fileObjects,
      expiresIn,
      expiresAt: new Date(Date.now() + expiresIn * 60 * 1000),
      senderId: req.user?.id
    });

    res.json({ 
      code, 
      expiresIn,
      filesCount: fileObjects.length
    });
  } catch (err) {
    console.error("SEND FILE ERROR:", err);
    res.status(500).json({ message: "File upload failed" });
  }
};


/* ================= RECEIVE FILE ================= */
export const receiveFile = async (req, res) => {
  try {
    const { code, fileIndex } = req.body;

    const fileBundle = await File.findOne({ code });
    if (!fileBundle) return res.status(404).json({ message: "Invalid code" });

    if (new Date() > fileBundle.expiresAt) {
      return res.status(410).json({ message: "Code expired" });
    }

    // If no specific file requested, return metadata of all files
    if (fileIndex === undefined) {
      return res.json({
        filesCount: fileBundle.files.length,
        files: fileBundle.files.map((f, idx) => ({
          index: idx,
          name: f.originalName,
          mimeType: f.mimeType
        }))
      });
    }

    // Get specific file
    const file = fileBundle.files[fileIndex];
    if (!file) return res.status(404).json({ message: "File not found" });

    // Record receiverId if user is authenticated
    if (!fileBundle.receiverId && req.user) {
      fileBundle.receiverId = req.user.id;
      await fileBundle.save();
    }

    const decryptedPath = `uploads/tmp-${Date.now()}`;
    await decryptFile(file.encryptedPath, decryptedPath);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(file.originalName)}"`
    );
    res.setHeader("Content-Type", file.mimeType);

    res.download(decryptedPath, file.originalName, (err) => {
      if (err) console.error("DOWNLOAD ERROR:", err);

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
  try {
    const userId = req.user.id;

    const files = await File.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    }).sort({ createdAt: -1 });

    res.json(files);
  } catch (err) {
    console.error("GET FILES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch files" });
  }
};

/* ================= DOWNLOAD FROM HISTORY ================= */
export const downloadFromHistory = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.sendStatus(404);

    if (
      file.senderId.toString() !== req.user.id &&
      file.receiverId?.toString() !== req.user.id
    ) return res.sendStatus(403);

    // Download first file from bundle
    const firstFile = file.files[0];
    if (!firstFile) return res.status(404).json({ message: "No files in bundle" });

    const decryptedPath = `uploads/tmp-${Date.now()}`;
    await decryptFile(firstFile.encryptedPath, decryptedPath);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(firstFile.originalName)}"`
    );
    res.setHeader("Content-Type", firstFile.mimeType);

    res.download(decryptedPath, firstFile.originalName, (err) => {
      if (err) console.error(err);

      if (fs.existsSync(decryptedPath)) {
        fs.unlink(decryptedPath, () => {});
      }
    });
  } catch (err) {
    console.error("DOWNLOAD FROM HISTORY ERROR:", err);
    res.status(500).json({ message: "Download failed" });
  }
};
