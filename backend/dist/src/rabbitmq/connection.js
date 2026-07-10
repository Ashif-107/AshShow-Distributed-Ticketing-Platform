"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = getChannel;
exports.closeConnection = closeConnection;
const amqplib_1 = __importDefault(require("amqplib"));
let connection = null;
let channel = null;
const RABBITMQ_URL = process.env.RABBITMQ_URL ||
    `amqp://${process.env.RABBITMQ_HOST || "localhost"}:${process.env.RABBITMQ_PORT || 5672}`;
async function getChannel() {
    if (channel)
        return channel;
    connection = await amqplib_1.default.connect(RABBITMQ_URL);
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
async function closeConnection() {
    try {
        await channel?.close();
        await connection?.close();
    }
    catch { }
}
