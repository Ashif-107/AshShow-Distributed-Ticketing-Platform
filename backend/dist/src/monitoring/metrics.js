"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitmqErrors = exports.activeConnections = exports.cacheMisses = exports.cacheHits = exports.lockContentionTotal = exports.bookingsTotal = exports.httpDuration = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
prom_client_1.default.collectDefaultMetrics();
exports.httpDuration = new prom_client_1.default.Histogram({
    name: "http_request_duration_ms",
    help: "Request duration in ms",
    labelNames: ["method", "route", "status"],
    buckets: [10, 50, 100, 200, 500, 1000, 2000, 5000],
});
exports.bookingsTotal = new prom_client_1.default.Counter({
    name: "bookings_total",
    help: "Successful bookings",
    labelNames: ["showId"],
});
exports.lockContentionTotal = new prom_client_1.default.Counter({
    name: "lock_contention_total",
    help: "Failed seat lock attempts",
});
exports.cacheHits = new prom_client_1.default.Counter({
    name: "cache_hits_total",
    help: "Redis cache hits",
    labelNames: ["key"],
});
exports.cacheMisses = new prom_client_1.default.Counter({
    name: "cache_misses_total",
    help: "Redis cache misses",
    labelNames: ["key"],
});
exports.activeConnections = new prom_client_1.default.Gauge({
    name: "active_websocket_connections",
    help: "Current active WebSocket connections",
});
exports.rabbitmqErrors = new prom_client_1.default.Counter({
    name: "rabbitmq_publish_errors_total",
    help: "RabbitMQ publish failures",
});
