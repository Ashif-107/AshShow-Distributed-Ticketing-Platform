"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const event_route_1 = __importDefault(require("./routes/event.route"));
const show_route_1 = __importDefault(require("./routes/show.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const booking_route_1 = __importDefault(require("./routes/booking.route"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_URL
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/api/health", (req, res) => {
    res.json({
        message: "Backend is Running"
    });
});
app.use("/api/auth", auth_route_1.default);
app.use("/api/events", event_route_1.default);
app.use("/api/shows", show_route_1.default);
app.use("/api/bookings", booking_route_1.default);
app.use(error_middleware_1.errorHandler);
exports.default = app;
