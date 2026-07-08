"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../src/prisma/client"));
const events = [
    {
        artist: "Lana Del Rey",
        tourName: "Ultraviolence Tour",
        genre: "Alternative Pop",
        imageUrl: "https://images.unsplash.com/photo-1711808688094-4873349ec56f",
        description: "Experience Lana Del Rey live."
    },
    {
        artist: "The Weeknd",
        tourName: "After Hours Tour",
        genre: "R&B",
        imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
        description: "The Weeknd Live."
    },
    {
        artist: "Olivia Rodrigo",
        tourName: "GUTS World Tour",
        genre: "Pop",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
        description: "Olivia Rodrigo live."
    },
    {
        artist: "Sabrina Carpenter",
        tourName: "Short n' Sweet Tour",
        genre: "Pop",
        imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35",
        description: "Sabrina Carpenter concert."
    },
    {
        artist: "Taylor Swift",
        tourName: "Eras Tour",
        genre: "Pop",
        imageUrl: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
        description: "Taylor Swift Live."
    }
];
async function main() {
    for (const event of events) {
        const createdEvent = await client_1.default.event.create({
            data: event,
        });
        for (let day = 0; day < 2; day++) {
            const show = await client_1.default.show.create({
                data: {
                    eventId: createdEvent.id,
                    venue: "Madison Square Garden",
                    price: 4999 + day * 1000,
                    startTime: new Date(2026, 6, 12 + day, 19, 0),
                },
            });
            const seats = [];
            const rows = ["A", "B", "C", "D", "E"];
            for (const row of rows) {
                for (let i = 1; i <= 10; i++) {
                    seats.push({
                        showId: show.id,
                        seatNumber: `${row}${i}`,
                    });
                }
            }
            await client_1.default.seat.createMany({
                data: seats,
            });
        }
    }
}
main()
    .then(async () => {
    console.log("Database seeded");
    await client_1.default.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await client_1.default.$disconnect();
});
