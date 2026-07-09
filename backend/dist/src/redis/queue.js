"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushToQueue = pushToQueue;
exports.popFromQueue = popFromQueue;
const ioredis_1 = __importDefault(require("ioredis"));
const client_1 = __importDefault(require("./client"));
const queueClient = new ioredis_1.default({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    retryStrategy: (times) => Math.min(times * 50, 2000),
});
queueClient.on("connect", () => {
    console.log("📦 Redis Queue subscriber client connected successfully");
});
queueClient.on("error", (err) => {
    console.error("❌ Redis Queue subscriber client error:", err);
});
async function pushToQueue(name, data) {
    await client_1.default.lpush(`queue:${name}`, JSON.stringify(data));
}
async function popFromQueue(name, timeout = 0) {
    const result = await queueClient.brpop(`queue:${name}`, timeout);
    if (result) {
        return JSON.parse(result[1]);
    }
    return null;
}
