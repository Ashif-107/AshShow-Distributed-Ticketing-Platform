"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    showId: zod_1.z.string().min(1, "Show ID is required"),
    seatIds: zod_1.z.array(zod_1.z.string()).min(1, "At least one seat must be selected").max(5, "You can book at most 5 tickets at once"),
});
