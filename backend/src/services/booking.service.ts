import prisma from "../prisma/client";

export async function bookingSeats(userId: string, showId: string, seatIds: string[]) {
  return prisma.$transaction(async (tx) => {
    // 1. Attempt to update the status of the requested seats to BOOKED,
    // but only if they are currently AVAILABLE.
    const updated = await tx.seat.updateMany({
      where: {
        id: { in: seatIds },
        showId: showId,
        status: "AVAILABLE",
      },
      data: {
        status: "BOOKED",
      },
    });

    // 2. Concurrency check: If the number of successfully updated seats doesn't
    // match the requested seat count, it means at least one seat was already booked
    // by someone else (or does not exist). Rollback the transaction by throwing an error.
    if (updated.count !== seatIds.length) {
      throw new Error("One or more of the selected seats are no longer available");
    }

    // 3. Create the booking records for the user.
    const bookings = await Promise.all(
      seatIds.map((seatId) =>
        tx.booking.create({
          data: {
            userId,
            showId,
            seatId,
          },
          include: {
            show: {
              select: {
                id: true,
                venue: true,
                startTime: true,
                price: true,
              },
            },
            seat: {
              select: {
                id: true,
                seatNumber: true,
                status: true,
              },
            },
          },
        })
      )
    );

    return bookings;
  });
}

/**
 * Retrieve all booking tickets for a user.
 */
export async function getAllTickets(userId: string) {
  return prisma.booking.findMany({
    where: {
      userId,
    },
    include: {
      show: {
        select: {
          id: true,
          venue: true,
          startTime: true,
          price: true,
          event: {
            select: {
              artist: true,
              tourName: true,
              genre: true,
            },
          },
        },
      },
      seat: {
        select: {
          id: true,
          seatNumber: true,
          status: true,
        },
      },
    },
    orderBy: {
      bookedAt: "desc",
    },
  });
}