import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utils/jwt";
import catchAsync from "../../utils/catchAsync";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    status: string;
  };
}

export const protect = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.authToken;
    // console.log(token);
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = verifyToken<{ userId: string; email: string; status: string }>(token);
    req.user = decoded;
    next();
  }
);
