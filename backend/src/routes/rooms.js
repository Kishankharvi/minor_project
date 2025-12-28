"use client"

import express from "express"
import Room from "../models/Room.js"
import { generateRoomId } from "../utils/generateId.js"

const router = express.Router()

router.get("/history/:userId", async (req, res) => {
  try {
    const rooms = await Room.find({
      "users.userId": req.params.userId,
    })
      .sort({ createdAt: -1 })
      .limit(10)
    res.json(rooms)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/create", async (req, res) => {
  try {
    const { user, mode = "one-to-one", maxUsers = 2, language = "javascript" } = req.body

    if (!user || !user._id) {
      return res.status(400).json({ message: "User information is required" })
    }

    const roomId = generateRoomId(8)
    const room = await Room.create({
      roomId,
      name: `${user.username}'s ${mode} session`,
      createdBy: user._id,
      mode,
      maxUsers,
      language,
      files: [
        {
          path: "main.js",
          content: "// Start coding here\nconsole.log('Hello, Code Room!');",
        },
      ],
      users: [{ userId: user._id, username: user.username }],
    })

    console.log("[ROOMS] Room created:", roomId)
    res.json({ success: true, room })
  } catch (err) {
    console.error("[ROOMS] Create error:", err.message)
    res.status(500).json({ error: err.message })
  }
})

router.post("/:roomId/join", async (req, res) => {
  try {
    const { user } = req.body

    if (!user || !user._id) {
      return res.status(400).json({ message: "User information is required" })
    }

    const room = await Room.findOne({ roomId: req.params.roomId })
    if (!room) {
      return res.status(404).json({ message: "Room not found" })
    }

    // Check if room is full
    if (room.users.length >= room.maxUsers) {
      return res.status(403).json({ message: "Room is full" })
    }

    const exists = room.users.some((u) => u.userId === user._id)
    if (!exists) {
      room.users.push({ userId: user._id, username: user.username })
      await room.save()
    }

    console.log("[ROOMS] User joined room:", req.params.roomId)
    res.json(room)
  } catch (err) {
    console.error("[ROOMS] Join error:", err.message)
    res.status(500).json({ error: err.message })
  }
})

export default router
