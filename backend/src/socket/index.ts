import { Server as SocketIOServer, Socket } from "socket.io";

export function setupSocketHandlers(io: SocketIOServer) {
  io.on("connection", (socket: Socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    socket.on("join:show", (showId: string) => {
      socket.join(`show:${showId}`);
    });

    socket.on("leave:show", (showId: string) => {
      socket.leave(`show:${showId}`);
    });

    socket.on("disconnect", () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });
}