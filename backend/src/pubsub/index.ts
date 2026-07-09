import Redis from "ioredis";
import { Server as SocketIOServer } from "socket.io";

export function setupPubSub(io: SocketIOServer) {
  const sub = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
  });

  sub.psubscribe("seat:*");

  sub.on("pmessage", (_pattern, channel, message) => {
    const parts = channel.split(":");
    if (parts.length < 3) return;
    const showId = parts[1];
    const eventType = parts[2];
    const seatId = message;

    io.to(`show:${showId}`).emit(`seat:${eventType}`, { seatId });
  });

  console.log("📡 Redis Pub/Sub subscriber started");
}