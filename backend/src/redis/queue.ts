import redis from "./client";

export async function pushToQueue(name: string, data: object) {
  await redis.lpush(`queue:${name}`, JSON.stringify(data));
}

export async function popFromQueue<T>(name: string, timeout: number = 0): Promise<T | null> {
  const result = await redis.brpop(`queue:${name}`, timeout);
  if (result) {
    return JSON.parse(result[1]) as T;
  }
  return null;
}