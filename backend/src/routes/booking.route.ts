import { Router } from "express";
import {bookSeats, getTickets} from "../controllers/booking.controller"
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createBookingSchema } from "../schema/booking.schema";


const router = Router()

router.post("/", authenticate, validate(createBookingSchema) , bookSeats)
router.get("/my",authenticate, getTickets)

export default router