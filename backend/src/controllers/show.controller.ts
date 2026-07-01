import { Request, Response } from "express";
import { getShowById, getSeatMap } from "../services/show.service";

export async function getShow(req: Request, res: Response) {
    try {
        const showId = Array.isArray(req.params.showId)
            ? req.params.showId[0]
            : req.params.showId

        if (!showId) {
            return res.status(400).json({
                message: "Invalid event ID",
            });
        }

        console.log(`Show Id fetching : ${showId}`)
        const show = await getShowById(showId)

        if (!show) {
            return res.status(404).json({
                message: `Error fetching the show `
            })
        }

        return res.json(show)
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: `error show controller: ${err}`,
        });
    }
}

export async function getSeats(req: Request, res: Response) {
    try {
        const showId = Array.isArray(req.params.showId) ? req.params.showId[0] : req.params.showId
        if (!showId) {
            return res.status(400).json({
                message: "Invalid event ID",
            });
        }

        const seatMap = await getSeatMap(showId)

        console.log(`Seats for Show Id fetching : ${showId}`)
        if (!seatMap) {
            return res.status(404).json({
                message: "Show not found",
            });
        }

        return res.json(seatMap)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `Error in get seats: ${err}`
        })
    }
}