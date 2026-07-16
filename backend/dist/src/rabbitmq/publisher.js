"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishBookingCreated = publishBookingCreated;
const connection_1 = require("./connection");
async function publishBookingCreated(payload) {
    const channel = await (0, connection_1.getChannel)();
    channel.publish("booking.exchange", "booking.created", Buffer.from(JSON.stringify(payload)), { persistent: true });
    console.log(`📤 Published booking.created for ${payload.bookingId}`);
}
