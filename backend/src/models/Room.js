import mongoose from "mongoose"

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    name: { type: String, default: "Untitled Room" },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    mode: { type: String, enum: ["one-to-one", "class"], default: "one-to-one" },
    maxUsers: { type: Number, default: 50 },
    status: { type: String, enum: ["active", "closed"], default: "active" },
    language: { type: String, default: "javascript" },
    files: [
      {
        path: String,
        content: { type: String, default: "" },
      },
    ],
    users: [{ userId: mongoose.Schema.Types.ObjectId, username: String }],
  },
  { timestamps: true },
)

export default mongoose.model("Room", roomSchema)
