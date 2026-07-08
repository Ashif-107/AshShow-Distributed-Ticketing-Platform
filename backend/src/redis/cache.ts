import redis from "./client";

export async function getOrSet<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 60
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const data = await fetchFn();

  if (data) {
    await redis.set(key, JSON.stringify(data), "EX", ttl);
  }

  return data;
}

export async function invalidate(...keys: string[]) {
  if (keys.length > 0) {
    await redis.del(keys);
  }
}