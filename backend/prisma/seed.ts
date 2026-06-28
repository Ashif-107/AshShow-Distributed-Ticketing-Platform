import prisma from "../src/prisma/client";

const events = [
  {
    artist: "Lana Del Rey",
    tourName: "Ultraviolence Tour",
    genre: "Alternative Pop",
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800",
    description: "Experience Lana Del Rey live."
  },

  {
    artist: "The Weeknd",
    tourName: "After Hours Tour",
    genre: "R&B",
    imageUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
    description: "The Weeknd Live."
  },

  {
    artist: "Olivia Rodrigo",
    tourName: "GUTS World Tour",
    genre: "Pop",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    description: "Olivia Rodrigo live."
  },

  {
    artist: "Sabrina Carpenter",
    tourName: "Short n' Sweet Tour",
    genre: "Pop",
    imageUrl:
      "https://images.unsplash.com/photo-1503095396549-807759245b35",
    description: "Sabrina Carpenter concert."
  },


  {
    artist: "Taylor Swift",
    tourName: "Eras Tour",
    genre: "Pop",
    imageUrl:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    description: "Taylor Swift Live."
  }
];


async function main() {
  for (const event of events) {

    const createdEvent = await prisma.event.create({
      data: event,
    });

    for (let day = 0; day < 2; day++) {

      const show = await prisma.show.create({
        data: {
          eventId: createdEvent.id,
          venue: "Madison Square Garden",
          price: 4999 + day * 1000,
          startTime: new Date(
            2026,
            6,
            12 + day,
            19,
            0
          ),
        },
      });

      const seats = [];

      const rows = ["A","B","C","D","E"];

      for (const row of rows) {
        for (let i = 1; i <= 10; i++) {
          seats.push({
            showId: show.id,
            seatNumber: `${row}${i}`,
          });
        }
      }

      await prisma.seat.createMany({
        data: seats,
      });

    }
  }
}

main()
  .then(async () => {
    console.log("Database seeded");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });