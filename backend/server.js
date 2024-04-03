import  express from "express";

import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from 'cookie-parser';
import connectMongodb from "./db/connectMongodb.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";


const PORT=5000;
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


server.listen(PORT,()=>{
    connectMongodb()
    console.log(`express is running on port ${PORT}`)
});