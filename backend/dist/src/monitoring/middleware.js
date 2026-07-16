"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = metricsMiddleware;
const metrics_1 = require("./metrics");
function metricsMiddleware(req, res, next) {
    const end = metrics_1.httpDuration.startTimer();
    res.on("finish", () => {
        end({
            method: req.method,
            route: req.route?.path || req.path,
            status: res.statusCode,
        });
    });
    next();
}
