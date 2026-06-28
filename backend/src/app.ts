import express from "express";
import cors from "cors"

import eventRoutes from "./routes/event.route";

const app = express()
app.use(cors())

app.use(express.json())

app.get("/health", (req,res) => {
    res.json({
        message: "Backend is Running"
    })
})

app.use("/events", eventRoutes)

export default app