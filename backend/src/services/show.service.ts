import prisma from "../prisma/client";
import { getOrSet } from "../redis/cache";


export async function getShowById(showId: string) {
  return getOrSet(`cache:show:${showId}`, async () => {

    return prisma.show.findUnique({
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


export async function getSeatMap(showId: string) {
  return getOrSet(`cache:seats:${showId}`, async () => {
    const show = await prisma.show.findUnique({
      where: {
        id: showId,
      },

      select: {
        id: true,
        venue: true,
        price: true,
        startTime: true,

        seats: {
          orderBy: {
            seatNumber: "asc",
          },

          select: {
            id: true,
            seatNumber: true,
            status: true,
          },
        },
      },
    });

    if (!show) return null;

    const groupedRows = new Map<
      string,
      {
        row: string;
        seats: {
          id: string;
          seatNumber: string;
          status: string;
        }[];
      }
    >();

    for (const seat of show.seats) {
      const row = seat.seatNumber[0];

      if (!groupedRows.has(row)) {
        groupedRows.set(row, {
          row,
          seats: [],
        });
      }

      groupedRows.get(row)!.seats.push({
        id: seat.id,
        seatNumber: seat.seatNumber,
        status: seat.status,
      });
    }

    return {
      show: {
        id: show.id,
        venue: show.venue,
        price: show.price,
        startTime: show.startTime,
      },

      rows: Array.from(groupedRows.values()),
    };
  }, 30);
}