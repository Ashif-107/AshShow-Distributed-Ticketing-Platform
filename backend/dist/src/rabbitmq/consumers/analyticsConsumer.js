"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAnalyticsConsumer = startAnalyticsConsumer;
async function startAnalyticsConsumer(channel) {
    channel.consume("analytics.queue", async (msg) => {
        if (!msg)
            return;
        try {
            const data = JSON.parse(msg.content.toString());
            console.log(`📊 Analytics: Booking ${data.bookingId}`);
            console.log(`   Artist: ${data.artist} | Venue: ${data.venue} | Revenue: ₹${data.price * data.seatNumbers.length}`);
            // Future: write to analytics database / Prometheus counter
            channel.ack(msg);
            console.log(`✅ Analytics logged for ${data.bookingId}`);
        }
        catch (err) {
            const death = msg.properties.headers?.["x-death"];
            const retryCount = death?.[0]?.count ?? 0;
            if (retryCount >= 3) {
                console.error(`❌ Analytics failed after 3 retries, sending to DLQ`);
                channel.reject(msg, false);
            }
            else {
                channel.nack(msg, false, true);
            }
        }
    }, { noAck: false });
    console.log("📊 Analytics consumer started");
}
