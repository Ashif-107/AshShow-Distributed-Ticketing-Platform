import amqp, { Channel, ChannelModel } from "amqplib";

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

const RABBITMQ_URL =
  process.env.RABBITMQ_URL ||
  `amqp://${process.env.RABBITMQ_HOST || "localhost"}:${process.env.RABBITMQ_PORT || 5672}`;

export async function getChannel(): Promise<Channel> {
  if (channel) return channel;

  connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();

  connection.on("close", async () => {
    console.warn("🔌 RabbitMQ connection closed. Reconnecting in 5s...");
    channel = null;
    connection = null;
    setTimeout(() => getChannel(), 5000);
  });

  console.log("✅ RabbitMQ connected");
  return channel;
}

export async function closeConnection() {
  try {
    await channel?.close();
    await connection?.close();
  } catch {}
}