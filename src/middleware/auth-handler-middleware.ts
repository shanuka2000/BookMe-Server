import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, NODE_ENV } from "../config/env-export-config.js";

const JWT_SECRET = ACCESS_TOKEN_SECRET || "123";

export interface AuthRequest extends Request {
  user: {
    id: string;
    email: string;
    role: "passenger" | "driver" | "admin";
  };
}

const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;

    if (NODE_ENV === "production") {
      if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
      }

      const decodedUser = jwt.verify(token, JWT_SECRET) as {
        id: string;
        email: string;
        role: "passenger" | "driver" | "admin";
      };

      req.user = decodedUser;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticateToken;
