import { NextFunction, Response } from "express";
import { AuthRequest } from "../../middleware/auth-handler-middleware.js";

export const getProfileController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    res
      .status(200)
      .json({ message: "Profile retrived successfully", data: user });
    return;
  } catch (err) {
    next(err);
  }
};
