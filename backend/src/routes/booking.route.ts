import { Router } from "express";
import {bookSeats, getTickets, lockSeatsHandler, confirmBooking } from "../controllers/booking.controller"
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createBookingSchema } from "../schema/booking.schema";


const router = Router()

router.post("/", authenticate, validate(createBookingSchema) , bookSeats)
router.get("/my",authenticate, getTickets)
router.post("/lock", authenticate, validate(createBookingSchema), lockSeatsHandler);
router.post("/confirm", authenticate, validate(createBookingSchema), confirmBooking);

export default router