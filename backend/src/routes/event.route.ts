import { Router } from "express";
import {getEvents, getEvent} from "../controllers/event.controller"

const router = Router()

router.get("/", getEvents)
router.get("/:eventId", getEvent)
export default router;