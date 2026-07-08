"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const client_1 = require("../generated/prisma/client");
function errorHandler(err, _req, res, _next) {
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const prismaError = err;
        if (prismaError.code === "P2002") {
            return res.status(409).json({
                message: "A record with this value already exists",
            });
        }
        if (prismaError.code === "P2025") {
            return res.status(404).json({
                message: "Record not found",
            });
        }
    }
    console.error("Unhandled error:", err);
    return res.status(500).json({
        message: "Internal server error",
    });
}
