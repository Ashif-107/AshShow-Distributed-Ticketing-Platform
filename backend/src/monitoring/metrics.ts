import prometheus from "prom-client";

prometheus.collectDefaultMetrics();

export const httpDuration = new prometheus.Histogram({
  name: "http_request_duration_ms",
  help: "Request duration in ms",
  labelNames: ["method", "route", "status"],
  buckets: [10, 50, 100, 200, 500, 1000, 2000, 5000],
});

export const bookingsTotal = new prometheus.Counter({
  name: "bookings_total",
  help: "Successful bookings",
  labelNames: ["showId"],
});

export const lockContentionTotal = new prometheus.Counter({
  name: "lock_contention_total",
  help: "Failed seat lock attempts",
});

export const cacheHits = new prometheus.Counter({
  name: "cache_hits_total",
  help: "Redis cache hits",
  labelNames: ["key"],
});

export const cacheMisses = new prometheus.Counter({
  name: "cache_misses_total",
  help: "Redis cache misses",
  labelNames: ["key"],
});

export const activeConnections = new prometheus.Gauge({
  name: "active_websocket_connections",
  help: "Current active WebSocket connections",
});

export const rabbitmqErrors = new prometheus.Counter({
  name: "rabbitmq_publish_errors_total",
  help: "RabbitMQ publish failures",
});