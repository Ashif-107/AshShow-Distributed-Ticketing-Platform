"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startNotificationConsumer = startNotificationConsumer;
async function startNotificationConsumer(channel) {
    channel.consume("notification.queue", async (msg) => {
        if (!msg)
            return;
        try {
            const data = JSON.parse(msg.content.toString());
            console.log(`📧 Sending confirmation to ${data.userEmail} (${data.userName})`);
            console.log(`   Booking: ${data.bookingId}`);
            // Future: send actual email via SES / SendGrid / SMTP
            channel.ack(msg);
            console.log(`✅ Notification sent for ${data.bookingId}`);
        }
        catch (err) {
            const death = msg.properties.headers?.["x-death"];
            const retryCount = death?.[0]?.count ?? 0;
            if (retryCount >= 3) {
                console.error(`❌ Notification failed after 3 retries, sending to DLQ`);
                channel.reject(msg, false);
            }
            else {
                channel.nack(msg, false, true);
            }
        }
    }, { noAck: false });
    console.log("📧 Notification consumer started");
}
