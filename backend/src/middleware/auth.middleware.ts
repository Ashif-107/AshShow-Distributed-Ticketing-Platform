import { Request, Response, NextFunction } from "express";
import { verifyToken, findUserById } from "../services/auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; name: string; email: string };
    }
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = verifyToken(token);
    const user = await findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Not authenticated" });
  }
}