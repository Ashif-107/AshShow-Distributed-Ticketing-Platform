"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockSeatsHandler = lockSeatsHandler;
exports.unlockSeatsHandler = unlockSeatsHandler;
exports.confirmBooking = confirmBooking;
exports.bookSeats = bookSeats;
exports.getTickets = getTickets;
const booking_service_1 = require("../services/booking.service");
const lock_1 = require("../redis/lock");
const cache_1 = require("../redis/cache");
async function lockSeatsHandler(req, res) {
    try {
        const userId = req.user.id;
        const { showId, seatIds } = req.body;
        const result = await (0, lock_1.lockSeats)(showId, seatIds, userId);
        return res.json(result);
    }
    catch (err) {
        if (err.message?.startsWith("Seat")) {
            return res.status(409).json({ message: err.message });
        }
        console.error("Lock error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function unlockSeatsHandler(req, res) {
    try {
        const userId = req.user.id;
        const { seatIds } = req.body;
        await (0, lock_1.unlockSeats)(seatIds, userId);
        return res.json({ unlocked: true });
    }
    catch (err) {
        console.error("Unlock error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function confirmBooking(req, res) {
    try {
        const userId = req.user.id;
        const { showId, seatIds } = req.body;
        const isValid = await (0, lock_1.verifyLock)(seatIds, userId);
        if (!isValid) {
            return res.status(409).json({
                message: "Seat lock expired or seat taken by another user. Please try again.",
            });
        }
        const bookings = await (0, booking_service_1.bookingSeats)(userId, showId, seatIds);
        await (0, lock_1.unlockSeats)(seatIds, userId);
        await (0, cache_1.invalidate)(`cache:seats:${showId}`, `cache:show:${showId}`, "cache:events");
        return res.status(201).json({ bookings });
    }
    catch (err) {
        if (err.message === "One or more of the selected seats are no longer available") {
            return res.status(409).json({ message: err.message });
        }
        console.error("Confirm booking error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function bookSeats(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const { showId, seatIds } = req.body;
        const bookings = await (0, booking_service_1.bookingSeats)(userId, showId, seatIds);
        return res.status(201).json({
            message: "Seats booked successfully",
            bookings,
        });
    }
    catch (err) {
        console.error("Booking error:", err);
        return res.status(400).json({
            message: err.message || "Failed to book seats",
        });
    }
}
async function getTickets(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const tickets = await (0, booking_service_1.getAllTickets)(userId);
        return res.json(tickets);
    }
    catch (err) {
        console.error("Get tickets error:", err);
        return res.status(500).json({
            message: err.message || "Failed to retrieve tickets",
        });
    }
}
