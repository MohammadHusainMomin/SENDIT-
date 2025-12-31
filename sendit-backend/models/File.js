import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    code: String,
    encryptedPath: String, 
    originalName: String,
    mimeType: String,

    expiresAt: Date,        
    isCodeUsed: {
      type: Boolean,
      default: false
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
