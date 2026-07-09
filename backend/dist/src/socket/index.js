"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketHandlers = setupSocketHandlers;
function setupSocketHandlers(io) {
    io.on("connection", (socket) => {
        console.log(`🔌 Client connected: ${socket.id}`);
        socket.on("join:show", (showId) => {
            console.log(`👥 Client ${socket.id} joining show room: show:${showId}`);
            socket.join(`show:${showId}`);
        });
        socket.on("leave:show", (showId) => {
            console.log(`👥 Client ${socket.id} leaving show room: show:${showId}`);
            socket.leave(`show:${showId}`);
        });
        socket.on("disconnect", () => {
            console.log(`🔌 Client disconnected: ${socket.id}`);
        });
    });
}
