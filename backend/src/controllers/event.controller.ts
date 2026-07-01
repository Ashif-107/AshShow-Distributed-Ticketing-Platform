import { Request, Response } from "express";
import { getAllEvents, getEventById } from "../services/event.service";

export async function getEvents(req: Request, res: Response){
    try{
        const events = await getAllEvents();
        res.status(200).json(events)
    }catch(error){
        console.log(`Error fecthing events from service in controller ${error}`)
        res.status(500).json({
            message: "Internal Server Error" ,
            error: error
        })
    }
}

export async function getEvent(req: Request, res: Response){
    try{
        const eventId = Array.isArray(req.params.eventId)
            ? req.params.eventId[0]
            : req.params.eventId

        if (!eventId) {
            return res.status(400).json({
                message: "Invalid event ID",
            });
        }

        console.log(`Event Id fetching : ${eventId}`)
        const event = await getEventById(eventId)

        if(!event){
            return res.status(404).json({
                message: "Event Not Found",
            });
        }

        return res.json(event)
    }catch(error){
        console.error(error)

        return res.status(500).json({
            message: `Error occured: ${error}`
        })
    }
}
