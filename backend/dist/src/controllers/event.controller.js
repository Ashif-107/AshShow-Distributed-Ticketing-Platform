"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = getEvents;
exports.getEvent = getEvent;
const event_service_1 = require("../services/event.service");
async function getEvents(req, res) {
    try {
        const events = await (0, event_service_1.getAllEvents)();
        res.status(200).json(events);
    }
    catch (error) {
        console.log(`Error fecthing events from service in controller ${error}`);
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        });
    }
}
async function getEvent(req, res) {
    try {
        const eventId = Array.isArray(req.params.eventId)
            ? req.params.eventId[0]
            : req.params.eventId;
        if (!eventId) {
            return res.status(400).json({
                message: "Invalid event ID",
            });
        }
        console.log(`Event Id fetching : ${eventId}`);
        const event = await (0, event_service_1.getEventById)(eventId);
        if (!event) {
            return res.status(404).json({
                message: "Event Not Found",
            });
        }
        return res.json(event);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Error occured: ${error}`
        });
    }
}
