import redis from "./client";

const LOCK_TTL = 300; // 5 minutes

export async function lockSeats(showId: string, seatIds: string[], userId: string) {
  const multi = redis.multi();

  for (const seatId of seatIds) {
    const key = `lock:seat:${seatId}`;
    multi.get(key);
  }

  const results = await multi.exec();
  if (!results) throw new Error("Failed to check locks");

  for (let i = 0; i < seatIds.length; i++) {
    const [, value] = results[i] as [Error | null, string | null];
    if (value && value !== userId) {
      throw new Error(`Seat ${seatIds[i]} is locked by another user`);
    }
  }

  const setMulti = redis.multi();
  for (const seatId of seatIds) {
    setMulti.set(`lock:seat:${seatId}`, userId, "EX", LOCK_TTL);
  }
  await setMulti.exec();

  // Track which seats the user has locked (for display / cleanup)
  await redis.sadd(`lock:user:${userId}`, ...seatIds);
  await redis.expire(`lock:user:${userId}`, LOCK_TTL);

  return { locked: true, expiresIn: LOCK_TTL };
}

export async function verifyLock(seatIds: string[], userId: string) {
  for (const seatId of seatIds) {
    const owner = await redis.get(`lock:seat:${seatId}`);
    if (owner !== userId) {
      return false;
    }
  }
  return true;
}

export async function unlockSeats(seatIds: string[], userId: string) {
  const multi = redis.multi();
  for (const seatId of seatIds) {
    multi.del(`lock:seat:${seatId}`);
  }
  multi.srem(`lock:user:${userId}`, ...seatIds);
  await multi.exec();
}