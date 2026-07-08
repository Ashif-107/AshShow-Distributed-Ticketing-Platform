import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import helmet from "helmet";

import eventRoutes from "./routes/event.route";
import showRoutes from "./routes/show.route"
import authRoutes from "./routes/auth.route";
import bookingRoutes from "./routes/booking.route"

import { errorHandler } from "./middleware/error.middleware";


const app = express()

app.use(helmet());
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req,res) => {
    res.json({
        message: "Backend is Running"
    })
})

app.get("/health", (req,res) => {
    res.json({
        message: "Backend is Running"
    })
})

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes)
app.use("/api/shows", showRoutes)
app.use("/api/bookings", bookingRoutes)

app.use(errorHandler);

export default app
