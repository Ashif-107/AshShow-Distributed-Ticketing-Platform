"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const socket_1 = require("./socket");
const pubsub_1 = require("./pubsub");
const worker_1 = require("./queue/worker");
const PORT = process.env.PORT || 8000;
const client_1 = __importDefault(require("./prisma/client"));
async function connectDB() {
    try {
        await client_1.default.$connect();
        console.log("✅ Prisma DB has been connected");
    }
    catch (error) {
        console.log(`❌ Error: ${error}`);
    }
}
connectDB();
const server = http_1.default.createServer(app_1.default);
const allowedOrigins = ["http://localhost:3000"];
const rawUrl = process.env.FRONTEND_URL;
if (rawUrl) {
    try {
        const url = new URL(rawUrl);
        allowedOrigins.push(url.origin);
    }
    catch {
        allowedOrigins.push(rawUrl.replace(/\/$/, ""));
    }
}
const uniqueOrigins = [...new Set(allowedOrigins)];
const io = new socket_io_1.Server(server, {
    cors: {
        origin: uniqueOrigins,
        credentials: true,
    },
});
(0, socket_1.setupSocketHandlers)(io);
(0, pubsub_1.setupPubSub)(io);
(0, worker_1.startWorker)();
server.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
});
