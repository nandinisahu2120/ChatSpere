// const expr ess = require('express')//method 1 for importing express
import express from "express"; //method 2
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import dns from "dns";

//change dns
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config({});

const app = express();

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend is running (^.^)");
// });

const PORT = process.env.PORT || 5000;
//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// http://localhost:8080/api/v1/user;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
