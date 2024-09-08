import { Request, Response, NextFunction } from "express";
import { authService } from "../services/authService";
import { AppError } from "./errorHandler";

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError("Authorization header is missing", 401));
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(new AppError("Invalid authorization header format", 401));
  }

  try {
    const payload = await authService.verifyToken(token);
    req.user = { id: payload.userId };
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};
