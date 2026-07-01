import { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = err as Prisma.PrismaClientKnownRequestError;
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