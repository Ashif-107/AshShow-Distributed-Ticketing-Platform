import Redis from "ioredis";
import { Server as SocketIOServer } from "socket.io";

export function setupPubSub(io: SocketIOServer) {
  const sub = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
  });

  sub.on("connect", () => {
    console.log("📡 Redis Pub/Sub subscriber connected successfully");
  });

  sub.on("error", (err) => {
    console.error("❌ Redis Pub/Sub subscriber error:", err);
  });

  sub.psubscribe("seat:*", (err, count) => {
    if (err) {
      console.error("❌ Failed to psubscribe to seat:*", err);
    } else {
      console.log(`📡 Subscribed to ${count} Redis Pub/Sub patterns (listening to seat:*)`);
    }
  });

  sub.on("pmessage", (pattern, channel, message) => {
    console.log(`✉️ Redis Pub/Sub message matching pattern ${pattern} received: channel=${channel}, message=${message}`);
    const parts = channel.split(":");
    if (parts.length < 3) return;
    const showId = parts[1];
    const eventType = parts[2];
    const seatId = message;

    console.log(`📤 Emitting seat:${eventType} to room show:${showId} with seatId: ${seatId}`);
    io.to(`show:${showId}`).emit(`seat:${eventType}`, { seatId });
  });

  console.log("📡 Redis Pub/Sub subscriber initialization triggered");
}