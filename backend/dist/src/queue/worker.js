"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWorker = startWorker;
const queue_1 = require("../redis/queue");
async function startWorker() {
    console.log("📦 Booking queue worker started");
    while (true) {
        try {
            const job = await (0, queue_1.popFromQueue)("booking", 0);
            if (job) {
                console.log(`📦 Processing booking ${job.bookingId} for user ${job.userId}`);
                // Future: send confirmation email
                // Future: generate PDF ticket
                console.log(`📦 Booking ${job.bookingId} processed`);
            }
        }
        catch (err) {
            console.error("❌ Worker error:", err);
        }
    }
}
