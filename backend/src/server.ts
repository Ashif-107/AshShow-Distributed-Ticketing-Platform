import dotenv from "dotenv";
dotenv.config()

import http from "http";
import { Server as SocketIOServer } from "socket.io";

import app from "./app";


import { setupSocketHandlers } from "./socket";
import { setupPubSub } from "./pubsub";
import { startWorker } from "./queue/worker";

const PORT = process.env.PORT || 8000;

import prisma from "./prisma/client"

async function connectDB(){
    try{
        await prisma.$connect();
        console.log("✅ Prisma DB has been connected")
    }catch (error){
        console.log(`❌ Error: ${error}`)
    }
}


connectDB();


const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
});

setupSocketHandlers(io);
setupPubSub(io);
startWorker();


server.listen(PORT, () =>{
    console.log(`App is running on port: ${PORT}`);
});