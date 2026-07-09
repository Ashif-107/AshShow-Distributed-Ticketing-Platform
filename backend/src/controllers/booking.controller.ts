import { Request, Response } from "express";
import { getAllTickets, bookingSeats } from "../services/booking.service";
import { lockSeats, verifyLock, unlockSeats } from "../redis/lock";
import { invalidate } from "../redis/cache";
import { publishSeatBooked } from "../redis/pub";
import { pushToQueue } from "../redis/queue";

export async function lockSeatsHandler(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const { showId, seatIds } = req.body;

    const result = await lockSeats(showId, seatIds, userId);
    return res.json(result);
  } catch (err: any) {
    if (err.message?.startsWith("Seat")) {
      return res.status(409).json({ message: err.message });
    }
    console.error("Lock error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function unlockSeatsHandler(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const { showId, seatIds } = req.body;

    await unlockSeats(seatIds, userId, showId);
    return res.json({ unlocked: true });
  } catch (err: any) {
    console.error("Unlock error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export async function confirmBooking(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const { showId, seatIds } = req.body;

    const isValid = await verifyLock(seatIds, userId);
    if (!isValid) {
      return res.status(409).json({
        message: "Seat lock expired or seat taken by another user. Please try again.",
      });
    }

    const bookings = await bookingSeats(userId, showId, seatIds);

    await unlockSeats(seatIds, userId);
    for (const seatId of seatIds) {
      publishSeatBooked(showId, seatId);
    }

    await pushToQueue("booking", {
      bookingId: bookings[0].id,
      userId,
      showId,
      seatIds,
    });
    await invalidate(`cache:seats:${showId}`, `cache:show:${showId}`, "cache:events");

    return res.status(201).json({ bookings });
  } catch (err: any) {
    if (err.message === "One or more of the selected seats are no longer available") {
      return res.status(409).json({ message: err.message });
    }
    console.error("Confirm booking error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function bookSeats(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const { showId, seatIds } = req.body;
    const bookings = await bookingSeats(userId, showId, seatIds);
    return res.status(201).json({
      message: "Seats booked successfully",
      bookings,
    });
  } catch (err: any) {
    console.error("Booking error:", err);
    return res.status(400).json({
      message: err.message || "Failed to book seats",
    });
  }
}

export async function getTickets(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const tickets = await getAllTickets(userId);
    return res.json(tickets);
  } catch (err: any) {
    console.error("Get tickets error:", err);
    return res.status(500).json({
      message: err.message || "Failed to retrieve tickets",
    });
  }
}
