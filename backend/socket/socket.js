// import { Server } from "socket.io";

// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000/"],
//     method: ["GET", "POST"],
//   },
// });

// export const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

// const userSocketMap = {}; // userId -> socketId

// io.on("connection", (socket) => {
//   console.log("user connected", socket.io);
//   const userId = socket.handshake.query.userId;
//   if (userId !== undefined) {
//     userSocketMap[userId] = socket.id;
//   }
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.io);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });
// export { app, io, server };

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"], // trailing slash hataya
    methods: ["GET", "POST"], // "method" → "methods" (typo fix)
    credentials: true, // ← ADD KIYA, CORS error fix karega
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // userId -> socketId

io.on("connection", (socket) => {
  console.log("user connected", socket.id); // socket.io → socket.id fix kiya
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id); // yahan bhi fix kiya
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
