import { Request, Response } from "express";
import { getAllTickets, bookingSeats } from "../services/booking.service";

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