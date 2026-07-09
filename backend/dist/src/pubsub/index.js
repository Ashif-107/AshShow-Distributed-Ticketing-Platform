"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPubSub = setupPubSub;
const ioredis_1 = __importDefault(require("ioredis"));
function setupPubSub(io) {
    const sub = new ioredis_1.default({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
    });
    sub.psubscribe("seat:*");
    sub.on("pmessage", (_pattern, channel, message) => {
        const parts = channel.split(":");
        if (parts.length < 3)
            return;
        const showId = parts[1];
        const eventType = parts[2];
        const seatId = message;
        io.to(`show:${showId}`).emit(`seat:${eventType}`, { seatId });
    });
    console.log("📡 Redis Pub/Sub subscriber started");
}
