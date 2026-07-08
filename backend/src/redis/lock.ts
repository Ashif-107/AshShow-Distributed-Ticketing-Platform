import redis from "./client";

const LOCK_TTL = 300; // 5 minutes
const UNLOCK_IF_OWNER_SCRIPT = `
  if redis.call("GET", KEYS[1]) == ARGV[1] then
    return redis.call("DEL", KEYS[1])
  end
  return 0
`;

export async function lockSeats(showId: string, seatIds: string[], userId: string) {
  void showId;

  const uniqueSeatIds = [...new Set(seatIds)].sort();
  const lockedByThisRequest: string[] = [];

  for (const seatId of uniqueSeatIds) {
    const key = `lock:seat:${seatId}`;
    const owner = await redis.get(key);

    if (owner === userId) {
      await redis.expire(key, LOCK_TTL);
      continue;
    }

    if (owner) {
      await unlockSeats(lockedByThisRequest, userId);
      throw new Error(`Seat ${seatId} is locked by another user`);
    }

    const result = await redis.set(key, userId, "EX", LOCK_TTL, "NX");
    if (result !== "OK") {
      await unlockSeats(lockedByThisRequest, userId);
      throw new Error(`Seat ${seatId} is locked by another user`);
    }

    lockedByThisRequest.push(seatId);
  }

  await redis.sadd(`lock:user:${userId}`, ...uniqueSeatIds);
  await redis.expire(`lock:user:${userId}`, LOCK_TTL);

  return { locked: true, expiresIn: LOCK_TTL };
}

export async function verifyLock(seatIds: string[], userId: string) {
  for (const seatId of new Set(seatIds)) {
    const owner = await redis.get(`lock:seat:${seatId}`);
    if (owner !== userId) {
      return false;
    }
  }

  return true;
}

export async function unlockSeats(seatIds: string[], userId: string) {
  const uniqueSeatIds = [...new Set(seatIds)];
  if (uniqueSeatIds.length === 0) return;

  const multi = redis.multi();

  for (const seatId of uniqueSeatIds) {
    multi.eval(UNLOCK_IF_OWNER_SCRIPT, 1, `lock:seat:${seatId}`, userId);
  }

  multi.srem(`lock:user:${userId}`, ...uniqueSeatIds);
  await multi.exec();
}
