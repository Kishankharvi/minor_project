import Room from "./models/Room.js"

export default function registerSocketHandlers(io) {
  const getParticipants = async (roomId) => {
    const sockets = await io.in(roomId).fetchSockets()
    const participants = []
    for (const socket of sockets) {
      if (socket.data.user) {
        participants.push({
          ...socket.data.user,
          role: socket.data.role,
          socketId: socket.id,
        })
      }
    }
    return participants
  }

  io.on("connection", (socket) => {
    socket.on("join-room", async ({ roomId, user }) => {
      try {
        const room = await Room.findOne({ roomId })
        if (!room) {
          socket.emit("error", { message: "Room not found" })
          return
        }

        const participants = await getParticipants(roomId)
        const isMentor = room.createdBy && user && room.createdBy.toString() === (user._id || user.id).toString()

        if (room.status === "closed") {
          socket.emit("error", { message: "This room is already closed" })
          return
        }

        if (!isMentor && participants.length >= room.maxUsers) {
          socket.emit("error", { message: "Room is full" })
          return
        }

        socket.join(roomId)
        socket.data.user = user
        socket.data.roomId = roomId

        let role = "participant"
        if (isMentor) {
          role = "mentor"
        }
        socket.data.role = role

        const updatedParticipants = await getParticipants(roomId)

        io.to(roomId).emit("update-participants", updatedParticipants)

        socket.emit("join-success", {
          role,
          participants: updatedParticipants,
          roomName: room.name,
        })
      } catch (e) {
        socket.emit("error", { message: "Failed to join room" })
      }
    })

    socket.on("send-chat", (msg) => {
      io.to(msg.roomId).emit("receive-chat", { ...msg, timestamp: new Date() })
    })

    socket.on("code-change", async ({ roomId, code, path }) => {
      try {
        const room = await Room.findOne({ roomId })
        if (!room) return

        socket.to(roomId).emit("code-update", { code, path, from: socket.id })
      } catch (e) {}
    })

    socket.on("toggle-edit", ({ roomId, userId, canEdit }) => {
      if (userId) {
        // Individual toggle
        io.to(roomId).emit("toggle-edit", { userId, canEdit })
      } else {
        // Global toggle
        io.to(roomId).emit("toggle-edit", { canEdit })
      }
    })

    socket.on("focus-file", ({ roomId, file }) => {
      socket.to(roomId).emit("focus-file", { file })
    })

    socket.on("request-edit", ({ roomId, userId, username }) => {
      socket.to(roomId).emit("request-edit", { userId, username })
    })

    socket.on("mentor-advice", ({ roomId, advice }) => {
      io.to(roomId).emit("mentor-advice", { advice, from: socket.data.user?.username })
    })

    socket.on("cursor:move", ({ roomId, position }) => {
      if (socket.data.user) {
        socket.to(roomId).emit("cursor:move", {
          userId: socket.data.user._id,
          username: socket.data.user.username,
          position,
        })
      }
    })

    socket.on("file-created", ({ roomId, file }) => {
      io.to(roomId).emit("file-created", { file, createdBy: socket.data.user?.username })
    })

    socket.on("annotation", ({ roomId, annotation }) => {
      io.to(roomId).emit("annotation", { ...annotation, author: socket.data.user?.username })
    })

    socket.on("disconnect", async () => {
      if (socket.data.roomId) {
        const participants = await getParticipants(socket.data.roomId)
        io.to(socket.data.roomId).emit("update-participants", participants)
        io.to(socket.data.roomId).emit("user:leave", { userId: socket.data.user?._id })
      }
    })
  })
}
