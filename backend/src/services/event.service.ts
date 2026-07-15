import prisma from "../prisma/client";
import { getOrSet, invalidate } from "../redis/cache";

export async function getAllEvents() {
  console.log("1. Enter getAllEvents");
  return getOrSet("cache:events", async () => {
    console.log("2. Inside getOrSet callback");
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

    console.log("3. Prisma query finished");

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


export async function getEventById(eventId: string) {
  return getOrSet(`cache:events:${eventId}`, async () => {

    const event = await prisma.event.findUnique({
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

    if (!event) return null;

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
  }, 60)
}
