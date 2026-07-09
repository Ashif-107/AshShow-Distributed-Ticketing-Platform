"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockSeats = lockSeats;
exports.verifyLock = verifyLock;
exports.unlockSeats = unlockSeats;
const client_1 = __importDefault(require("./client"));
const pub_1 = require("./pub");
const LOCK_TTL = 300; // 5 minutes
const UNLOCK_IF_OWNER_SCRIPT = `
  if redis.call("GET", KEYS[1]) == ARGV[1] then
    return redis.call("DEL", KEYS[1])
  end
  return 0
`;
async function lockSeats(showId, seatIds, userId) {
    const uniqueSeatIds = [...new Set(seatIds)].sort();
    const lockedByThisRequest = [];
    for (const seatId of uniqueSeatIds) {
        const key = `lock:seat:${seatId}`;
        const owner = await client_1.default.get(key);
        if (owner === userId) {
            await client_1.default.expire(key, LOCK_TTL);
            continue;
        }
        if (owner) {
            await unlockSeats(lockedByThisRequest, userId, showId);
            throw new Error(`Seat ${seatId} is locked by another user`);
        }
        const result = await client_1.default.set(key, userId, "EX", LOCK_TTL, "NX");
        if (result !== "OK") {
            await unlockSeats(lockedByThisRequest, userId, showId);
            throw new Error(`Seat ${seatId} is locked by another user`);
        }
        lockedByThisRequest.push(seatId);
    }
    await client_1.default.sadd(`lock:user:${userId}`, ...uniqueSeatIds);
    await client_1.default.expire(`lock:user:${userId}`, LOCK_TTL);
    for (const seatId of seatIds) {
        (0, pub_1.publishSeatLocked)(showId, seatId);
    }
    return { locked: true, expiresIn: LOCK_TTL };
}
async function verifyLock(seatIds, userId) {
    for (const seatId of new Set(seatIds)) {
        const owner = await client_1.default.get(`lock:seat:${seatId}`);
        if (owner !== userId) {
            return false;
        }
    }
    return true;
}
async function unlockSeats(seatIds, userId, showId) {
    const uniqueSeatIds = [...new Set(seatIds)];
    if (uniqueSeatIds.length === 0)
        return;
    const multi = client_1.default.multi();
    for (const seatId of uniqueSeatIds) {
        multi.eval(UNLOCK_IF_OWNER_SCRIPT, 1, `lock:seat:${seatId}`, userId);
    }
    multi.srem(`lock:user:${userId}`, ...uniqueSeatIds);
    await multi.exec();
    if (showId) {
        for (const seatId of seatIds) {
            (0, pub_1.publishSeatAvailable)(showId, seatId);
        }
    }
}
