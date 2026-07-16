import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import helmet from "helmet";

import eventRoutes from "./routes/event.route";
import showRoutes from "./routes/show.route"
import authRoutes from "./routes/auth.route";
import bookingRoutes from "./routes/booking.route"

import { errorHandler } from "./middleware/error.middleware";

import { metricsMiddleware } from "./monitoring/middleware";
import prometheus from "prom-client";

const app = express()

app.set("trust proxy", 1)
app.use(helmet());
const allowedOrigins = ["http://localhost:3000"];
const rawUrl = process.env.FRONTEND_URL;
if (rawUrl) {
  try {
    const url = new URL(rawUrl);
    allowedOrigins.push(url.origin);
  } catch {
    allowedOrigins.push(rawUrl.replace(/\/$/, ""));
  }
}
const uniqueOrigins = [...new Set(allowedOrigins)];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || uniqueOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(metricsMiddleware);


app.get("/api/metrics", async (req, res) => {
  res.set("Content-Type", prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});

app.get("/api/health", (req, res) => {
  res.json({
    message: "Backend is Running"
  })
})

app.get("/health", (req, res) => {
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
