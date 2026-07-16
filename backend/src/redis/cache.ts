import { cacheHits, cacheMisses } from "../monitoring/metrics";
import redis from "./client";

export async function getOrSet<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 60
): Promise<T> {
  console.log("1. Redis GET");
  const cached = await redis.get(key);
  console.log("2. Redis GET completed");

  if (cached) {
    cacheHits.inc({ key });
    console.log("3. Cache hit");
    return JSON.parse(cached);
  }

  cacheMisses.inc({ key });
  console.log("4. Cache miss");

  const data = await fetchFn();
  console.log("5. Prisma callback completed");

  if (data) {
    console.log("6. Redis SET");
    await redis.set(key, JSON.stringify(data), "EX", ttl);
    console.log("7. Redis SET completed");
  }

  return data;
}

export async function invalidate(...keys: string[]) {
  if (keys.length > 0) {
    await redis.del(keys);
  }
}