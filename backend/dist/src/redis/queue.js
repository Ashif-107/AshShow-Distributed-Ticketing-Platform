"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushToQueue = pushToQueue;
exports.popFromQueue = popFromQueue;
const client_1 = __importDefault(require("./client"));
async function pushToQueue(name, data) {
    await client_1.default.lpush(`queue:${name}`, JSON.stringify(data));
}
async function popFromQueue(name, timeout = 0) {
    const result = await client_1.default.brpop(`queue:${name}`, timeout);
    if (result) {
        return JSON.parse(result[1]);
    }
    return null;
}
