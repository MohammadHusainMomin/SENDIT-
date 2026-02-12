import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    code: String,
    files: [
      {
        encryptedPath: String,
        originalName: String,
        mimeType: String
      }
    ],

    expiresAt: Date,
    expiresIn: {
      type: Number,
      default: 10,
      description: "Expiration time in minutes"
    },
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
