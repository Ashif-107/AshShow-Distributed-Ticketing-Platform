"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrSet = getOrSet;
exports.invalidate = invalidate;
const client_1 = __importDefault(require("./client"));
async function getOrSet(key, fetchFn, ttl = 60) {
    const cached = await client_1.default.get(key);
    if (cached)
        return JSON.parse(cached);
    const data = await fetchFn();
    if (data) {
        await client_1.default.set(key, JSON.stringify(data), "EX", ttl);
    }
    return data;
}
async function invalidate(...keys) {
    if (keys.length > 0) {
        await client_1.default.del(keys);
    }
}
