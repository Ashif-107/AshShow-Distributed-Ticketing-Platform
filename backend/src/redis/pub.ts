import redis from "./client";

export function publishSeatLocked(showId: string, seatId: string) {
  redis.publish(`seat:${showId}:locked`, seatId);
}

export function publishSeatBooked(showId: string, seatId: string) {
  redis.publish(`seat:${showId}:booked`, seatId);
}

export function publishSeatAvailable(showId: string, seatId: string) {
  redis.publish(`seat:${showId}:available`, seatId);
}