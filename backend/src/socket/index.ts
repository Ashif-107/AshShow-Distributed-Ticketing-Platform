import { Server as SocketIOServer, Socket } from "socket.io";
import { activeConnections } from "../monitoring/metrics";

export function setupSocketHandlers(io: SocketIOServer) {
  io.on("connection", (socket: Socket) => {
    activeConnections.inc();
    console.log(`🔌 Client connected: ${socket.id}`);

    socket.on("join:show", (showId: string) => {
      console.log(`👥 Client ${socket.id} joining show room: show:${showId}`);
      socket.join(`show:${showId}`);
    });

    socket.on("leave:show", (showId: string) => {
      console.log(`👥 Client ${socket.id} leaving show room: show:${showId}`);
      socket.leave(`show:${showId}`);
    });

    socket.on("disconnect", () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
      activeConnections.dec();
    });
  });
}