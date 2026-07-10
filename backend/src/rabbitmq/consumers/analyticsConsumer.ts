import { Channel, ConsumeMessage } from "amqplib";

export async function startAnalyticsConsumer(channel: Channel) {
  channel.consume(
    "analytics.queue",
    async (msg: ConsumeMessage | null) => {
      if (!msg) return;

      try {
        const data = JSON.parse(msg.content.toString());
        console.log(`📊 Analytics: Booking ${data.bookingId}`);
        console.log(`   Artist: ${data.artist} | Venue: ${data.venue} | Revenue: ₹${data.price * data.seatNumbers.length}`);

        // Future: write to analytics database / Prometheus counter

        channel.ack(msg);
        console.log(`✅ Analytics logged for ${data.bookingId}`);
      } catch (err) {
        const death = msg.properties.headers?.["x-death"];
        const retryCount = death?.[0]?.count ?? 0;

        if (retryCount >= 3) {
          console.error(`❌ Analytics failed after 3 retries, sending to DLQ`);
          channel.reject(msg, false);
        } else {
          channel.nack(msg, false, true);
        }
      }
    },
    { noAck: false }
  );

  console.log("📊 Analytics consumer started");
}