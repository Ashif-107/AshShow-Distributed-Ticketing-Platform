import Redis from "ioredis";
import redis from "./client";

const queueClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

queueClient.on("connect", () => {
  console.log("📦 Redis Queue subscriber client connected successfully");
});

queueClient.on("error", (err) => {
  console.error("❌ Redis Queue subscriber client error:", err);
});

export async function pushToQueue(name: string, data: object) {
  await redis.lpush(`queue:${name}`, JSON.stringify(data));
}

export async function popFromQueue<T>(name: string, timeout: number = 0): Promise<T | null> {
  const result = await queueClient.brpop(`queue:${name}`, timeout);
  if (result) {
    return JSON.parse(result[1]) as T;
  }
  return null;
}