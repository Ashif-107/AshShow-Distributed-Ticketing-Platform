import { Request, Response } from "express";
import { getAllEvents } from "../services/event.service";

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