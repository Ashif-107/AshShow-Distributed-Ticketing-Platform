import { Router } from "express";
import { getSeats, getShow } from "../controllers/show.controller";

const router = Router();

router.get("/:showId", getShow);
router.get("/:showId/seats", getSeats);

export default router;