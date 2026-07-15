import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  connectTimeout: 5000,        // ← fail fast if Redis is unreachable
  lazyConnect: true,           // ← don't block server boot
  tls: {},                          // ← required for ElastiCache encryption in transit
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

export default redis;