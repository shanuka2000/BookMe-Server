import { NextFunction, Request, Response } from "express";
import {
  validateLogin,
  validateRegistration,
  validateResetPassword,
} from "../../../utils/validators.js";
import {
  createAdmin,
  deleteAdmin,
  findAdminByEmail,
  findById,
  isEmailTaken,
  logoutAdmin,
  resetPassword,
} from "./service.js";
import { comparePassword } from "../../../utils/password-hash.js";
import { AuthRequest } from "../../../middleware/auth-handler-middleware.js";
import { generateAdminAccessToken } from "../../../utils/token-generator.js";
import { NODE_ENV } from "../../../config/env-export-config.js";

export const registerAdminController = async (
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

    const user = await createAdmin(firstName, lastName, email, password);
    res.status(201).json({
      message: "Admin registered successfully!",
      data: user,
    });
    return;
  } catch (err) {
    next(err);
  }
};

export const loginAdminController = async (
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

    const driver = await findAdminByEmail(email);
    if (!driver) {
      res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await comparePassword(password, driver.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const token = generateAdminAccessToken(driver);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({
      message: "Login successful.",
      user: driver,
    });
  } catch (err) {
    next(err);
  }
};

export const logoutAdminController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await logoutAdmin(req, res);

    res.status(200).json({ message: "Logged out successfully." });
  } catch (err) {
    next(err);
  }
};

export const resetAdminPasswordController = async (
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

export const deleteAdminController = async (
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

    await deleteAdmin(id);

    res.status(200).json({ message: "The user was deleted successfully." });
  } catch (err) {
    next(err);
  }
};
