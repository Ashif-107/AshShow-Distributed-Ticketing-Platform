"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShowById = getShowById;
exports.getSeatMap = getSeatMap;
const client_1 = __importDefault(require("../prisma/client"));
const cache_1 = require("../redis/cache");
const client_2 = __importDefault(require("../redis/client"));
async function getShowById(showId) {
    return (0, cache_1.getOrSet)(`cache:show:${showId}`, async () => {
        return client_1.default.show.findUnique({
            where: {
                id: showId,
            },
            select: {
                id: true,
                venue: true,
                price: true,
                startTime: true,
                event: {
                    select: {
                        id: true,
                        artist: true,
                        tourName: true,
                        imageUrl: true,
                        genre: true,
                    },
                },
            },
        });
    }, 120);
}
async function getSeatMap(showId) {
    return (0, cache_1.getOrSet)(`cache:seats:${showId}`, async () => {
        const show = await client_1.default.show.findUnique({
            where: { id: showId },
            select: {
                id: true, venue: true, price: true, startTime: true,
                seats: {
                    orderBy: { seatNumber: "asc" },
                    select: { id: true, seatNumber: true, status: true },
                },
            },
        });
        if (!show)
            return null;
        const pipeline = client_2.default.pipeline();
        show.seats.forEach((seat) => pipeline.exists(`lock:seat:${seat.id}`));
        const results = await pipeline.exec();
        const enrichedSeats = show.seats.map((seat, i) => {
            const isLocked = results?.[i]?.[1] === 1;
            return {
                id: seat.id,
                seatNumber: seat.seatNumber,
                status: isLocked ? "LOCKED" : seat.status,
            };
        });
        const groupedRows = new Map();
        for (const seat of enrichedSeats) {
            const row = seat.seatNumber[0];
            if (!groupedRows.has(row)) {
                groupedRows.set(row, { row, seats: [] });
            }
            groupedRows.get(row).seats.push(seat);
        }
        return {
            show: { id: show.id, venue: show.venue, price: show.price, startTime: show.startTime },
            rows: Array.from(groupedRows.values()),
        };
    }, 10);
}
