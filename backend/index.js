import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dns from "dns";
import { app, server } from "./socket/socket.js"; // ← YE ADD KARO

//change dns
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config({});

// const app = express();   ← YE LINE DELETE KARO, ab app socket.js se aa raha hai

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption));

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
  // ← app.listen ki jagah server.listen
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
