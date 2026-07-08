"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShow = getShow;
exports.getSeats = getSeats;
const show_service_1 = require("../services/show.service");
async function getShow(req, res) {
    try {
        const showId = Array.isArray(req.params.showId)
            ? req.params.showId[0]
            : req.params.showId;
        if (!showId) {
            return res.status(400).json({
                message: "Invalid event ID",
            });
        }
        console.log(`Show Id fetching : ${showId}`);
        const show = await (0, show_service_1.getShowById)(showId);
        if (!show) {
            return res.status(404).json({
                message: `Error fetching the show `
            });
        }
        return res.json(show);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: `error show controller: ${err}`,
        });
    }
}
async function getSeats(req, res) {
    try {
        const showId = Array.isArray(req.params.showId) ? req.params.showId[0] : req.params.showId;
        if (!showId) {
            return res.status(400).json({
                message: "Invalid event ID",
            });
        }
        const seatMap = await (0, show_service_1.getSeatMap)(showId);
        console.log(`Seats for Show Id fetching : ${showId}`);
        if (!seatMap) {
            return res.status(404).json({
                message: "Show not found",
            });
        }
        return res.json(seatMap);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Error in get seats: ${err}`
        });
    }
}
