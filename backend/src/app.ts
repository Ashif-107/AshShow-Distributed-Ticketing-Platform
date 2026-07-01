import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import helmet from "helmet";

import eventRoutes from "./routes/event.route";
import showRoutes from "./routes/show.route"
import authRoutes from "./routes/auth.route";

import { errorHandler } from "./middleware/error.middleware";


const app = express()

app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req,res) => {
    res.json({
        message: "Backend is Running"
    })
})

app.use("/auth", authRoutes);
app.use("/events", eventRoutes)
app.use("/shows", showRoutes)

app.use(errorHandler);

export default app