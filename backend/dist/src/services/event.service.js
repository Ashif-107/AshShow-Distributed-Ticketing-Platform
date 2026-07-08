"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEvents = getAllEvents;
exports.getEventById = getEventById;
const client_1 = __importDefault(require("../prisma/client"));
const cache_1 = require("../redis/cache");
async function getAllEvents() {
    return (0, cache_1.getOrSet)("cache:events", async () => {
        const events = await client_1.default.event.findMany({
            include: {
                shows: {
                    orderBy: {
                        startTime: "asc",
                    },
                    take: 1, // Only the next upcoming show
                    select: {
                        id: true,
                        venue: true,
                        price: true,
                        startTime: true,
                        _count: {
                            select: {
                                seats: {
                                    where: {
                                        status: "AVAILABLE",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return events.map((event) => ({
            id: event.id,
            artist: event.artist,
            tourName: event.tourName,
            imageUrl: event.imageUrl,
            genre: event.genre,
            description: event.description,
            nextShow: event.shows[0]
                ? {
                    id: event.shows[0].id,
                    venue: event.shows[0].venue,
                    startTime: event.shows[0].startTime,
                    price: event.shows[0].price,
                    availableSeats: event.shows[0]._count.seats,
                }
                : null,
        }));
    }, 60);
}
async function getEventById(eventId) {
    return (0, cache_1.getOrSet)(`cache:events:${eventId}`, async () => {
        const event = await client_1.default.event.findUnique({
            where: {
                id: eventId,
            },
            include: {
                shows: {
                    orderBy: {
                        startTime: "asc",
                    },
                    select: {
                        id: true,
                        venue: true,
                        price: true,
                        startTime: true,
                        _count: {
                            select: {
                                seats: {
                                    where: {
                                        status: "AVAILABLE",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!event)
            return null;
        return {
            id: event.id,
            artist: event.artist,
            tourName: event.tourName,
            imageUrl: event.imageUrl,
            genre: event.genre,
            description: event.description,
            shows: event.shows.map((show) => ({
                id: show.id,
                venue: show.venue,
                price: show.price,
                startTime: show.startTime,
                availableSeats: show._count.seats,
            })),
        };
    }, 60);
}
