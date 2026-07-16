"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTicketConsumer = startTicketConsumer;
async function startTicketConsumer(channel) {
    channel.consume("ticket.queue", async (msg) => {
        if (!msg)
            return;
        try {
            const data = JSON.parse(msg.content.toString());
            console.log(`🎫 Generating ticket for booking ${data.bookingId}`);
            console.log(`   ${data.artist} - ${data.tourName} at ${data.venue}`);
            console.log(`   Seats: ${data.seatNumbers.join(", ")}`);
            // Future: generate actual PDF and store it
            channel.ack(msg);
            console.log(`✅ Ticket generated for ${data.bookingId}`);
        }
        catch (err) {
            const death = msg.properties.headers?.["x-death"];
            const retryCount = death?.[0]?.count ?? 0;
            if (retryCount >= 3) {
                console.error(`❌ Ticket failed after 3 retries, sending to DLQ: ${msg.content.toString()}`);
                channel.reject(msg, false);
            }
            else {
                console.warn(`⚠️ Ticket processing failed (retry ${retryCount + 1}/3), re-queuing`);
                channel.nack(msg, false, true);
            }
        }
    }, { noAck: false });
    console.log("🎫 Ticket consumer started");
}
