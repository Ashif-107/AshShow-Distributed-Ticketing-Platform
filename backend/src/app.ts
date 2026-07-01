import express from "express";
import cors from "cors"

import eventRoutes from "./routes/event.route";
import showRoutes from "./routes/show.route"
import { errorHandler } from "./middleware/error.middleware";


const app = express()
app.use(cors())

app.use(express.json())

app.get("/health", (req,res) => {
    res.json({
        message: "Backend is Running"
    })
})

app.use("/events", eventRoutes)
app.use("/shows", showRoutes)

app.use(errorHandler);
export default app