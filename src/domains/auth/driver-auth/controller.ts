import { NextFunction, Request, Response } from "express";
import {
  validateLogin,
  validateRegistration,
  validateResetPassword,
} from "../../../utils/validators.js";
import {
  createDriver,
  deleteDriver,
  findById,
  findDriverByEmail,
  isEmailTaken,
  logoutDriver,
  resetPassword,
} from "./service.js";
import { comparePassword } from "../../../utils/password-hash.js";
import { generateDriverAccessToken } from "../../../utils/token-generator.js";
import { NODE_ENV } from "../../../config/env-export-config.js";
import { AuthRequest } from "../../../middleware/auth-handler-middleware.js";

export const registerDriverController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const { error } = validateRegistration(req.body);
    if (error) {
      res.status(400).json({
        message: "Validation failed.",
        error: error.details[0].message,
      });
      return;
    }

    if (await isEmailTaken(email)) {
      res.status(409).json({ message: "Email is already in use." });
      return;
    }

    const user = await createDriver(firstName, lastName, email, password);
    res.status(201).json({
      message: "Driver registered successfully!",
      data: user,
    });
    return;
  } catch (err) {
    next(err);
  }
};

export const loginDriverController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      res.status(400).json({
        message: "Validation failed.",
        errors: error.details[0].message,
      });
      return;
    }

    const { email, password } = req.body;

    const driver = await findDriverByEmail(email);
    if (!driver) {
      res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await comparePassword(password, driver.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const token = generateDriverAccessToken(driver);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({
      message: "Login successful.",
      data: driver,
    });
  } catch (err) {
    next(err);
  }
};

export const logoutDriverController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await logoutDriver(req, res);

    res.status(200).json({ message: "Logged out successfully." });
  } catch (err) {
    next(err);
  }
};

export const resetDriverPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateResetPassword(req.body);
    if (error) {
      res.status(400).json({
        message: "Validation failed.",
        errors: error.details[0].message,
      });
      return;
    }
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const user = await findById(id);
    if (!user) {
      res.status(401).json({
        message:
          "The user was not found or your current password is incorrect.",
      });
    }
    const isCurrentPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      res.status(401).json({
        message:
          "The user was not found or your current password is incorrect.",
      });
      return;
    }

    const result = await resetPassword(id, newPassword);

    res
      .status(200)
      .json({ message: "Password reset successful.", data: result });
  } catch (err) {
    next(err);
  }
};

export const deleteDriverController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await findById(id);
    if (!user) {
      res.status(404).json({ message: "The user was not found." });
    }

    await deleteDriver(id);

    res.status(200).json({ message: "The user was deleted successfully." });
    return;
  } catch (err) {
    next(err);
  }
};
