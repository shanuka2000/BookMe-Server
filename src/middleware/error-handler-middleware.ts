import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error & { status?: number; message?: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  const message =
    err.message || "Something went wrong. Please try again later.";
  res;
  res.status(statusCode).json({ message });
};
