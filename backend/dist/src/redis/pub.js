"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishSeatLocked = publishSeatLocked;
exports.publishSeatBooked = publishSeatBooked;
exports.publishSeatAvailable = publishSeatAvailable;
const client_1 = __importDefault(require("./client"));
function publishSeatLocked(showId, seatId) {
    client_1.default.publish(`seat:${showId}:locked`, seatId);
}
function publishSeatBooked(showId, seatId) {
    client_1.default.publish(`seat:${showId}:booked`, seatId);
}
function publishSeatAvailable(showId, seatId) {
    client_1.default.publish(`seat:${showId}:available`, seatId);
}
