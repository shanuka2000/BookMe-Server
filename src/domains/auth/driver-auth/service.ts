import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth-handler-middleware.js";
import { hashPassword } from "../../../utils/password-hash.js";
import DriverAuth, { IDriverAuth } from "./model.js";
import { NODE_ENV } from "../../../config/env-export-config.js";

export const isEmailTaken = async (email: string): Promise<boolean> => {
  return !!(await DriverAuth.findOne({ email }));
};

export const findDriverByEmail = async (
  email: string
): Promise<IDriverAuth | null> => {
  return DriverAuth.findOne({ email });
};

export const findById = async (id: string): Promise<IDriverAuth | null> => {
  return DriverAuth.findById(id);
};

export const createDriver = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<IDriverAuth> => {
  const hashedPassword = await hashPassword(password);
  const driver = new DriverAuth({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  return await driver.save();
};

export const logoutDriver = async (req: AuthRequest, res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const resetPassword = async (id: string, newPassword: string) => {
  const driver = await DriverAuth.findById({ _id: id });
  const hashedPassword = await hashPassword(newPassword);
  driver.password = hashedPassword;
  return await driver.save();
};

export const deleteDriver = async (id: string) => {
  const result = await DriverAuth.findByIdAndDelete({ _id: id });
  return result;
};
