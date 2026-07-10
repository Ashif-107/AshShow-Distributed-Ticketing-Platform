import { Channel } from "amqplib";

export async function setupRabbitMQ(channel: Channel) {
  // Main exchange for booking events
  await channel.assertExchange("booking.exchange", "topic", { durable: true });

  // Dead letter exchange — holds failed messages after retries exhausted
  await channel.assertExchange("booking.dlx", "topic", { durable: true });

  // ── Ticket Queue ──
  await channel.assertQueue("ticket.queue", {
    durable: true,
    deadLetterExchange: "booking.dlx",
    deadLetterRoutingKey: "ticket.failed",
  });
  await channel.bindQueue("ticket.queue", "booking.exchange", "booking.created");

  await channel.assertQueue("ticket.dlq", { durable: true });
  await channel.bindQueue("ticket.dlq", "booking.dlx", "ticket.failed");

  // ── Notification Queue ──
  await channel.assertQueue("notification.queue", {
    durable: true,
    deadLetterExchange: "booking.dlx",
    deadLetterRoutingKey: "notification.failed",
  });
  await channel.bindQueue("notification.queue", "booking.exchange", "booking.created");

  await channel.assertQueue("notification.dlq", { durable: true });
  await channel.bindQueue("notification.dlq", "booking.dlx", "notification.failed");

  // ── Analytics Queue ──
  await channel.assertQueue("analytics.queue", {
    durable: true,
    deadLetterExchange: "booking.dlx",
    deadLetterRoutingKey: "analytics.failed",
  });
  await channel.bindQueue("analytics.queue", "booking.exchange", "booking.created");

  await channel.assertQueue("analytics.dlq", { durable: true });
  await channel.bindQueue("analytics.dlq", "booking.dlx", "analytics.failed");

  console.log("📦 RabbitMQ exchanges and queues set up");
}