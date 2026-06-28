import prisma from "../prisma/client";

export async function getAllEvents() {
  const events = await prisma.event.findMany({
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
}