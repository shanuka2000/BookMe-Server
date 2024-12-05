import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth-handler-middleware.js";
import { hashPassword } from "../../../utils/password-hash.js";
import { IAdminAuth } from "./model.js";
import { NODE_ENV } from "../../../config/env-export-config.js";
import AdminAuth from "./model.js";

export const isEmailTaken = async (email: string): Promise<boolean> => {
  return !!(await AdminAuth.findOne({ email }));
};

export const findAdminByEmail = async (
  email: string
): Promise<IAdminAuth | null> => {
  return AdminAuth.findOne({ email });
};

export const findById = async (id: string): Promise<IAdminAuth | null> => {
  return AdminAuth.findById(id);
};

export const createAdmin = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<IAdminAuth> => {
  const hashedPassword = await hashPassword(password);
  const admin = new AdminAuth({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  return await admin.save();
};

export const logoutAdmin = async (req: AuthRequest, res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const resetPassword = async (id: string, newPassword: string) => {
  const admin = await AdminAuth.findById({ _id: id });
  const hashedPassword = await hashPassword(newPassword);
  admin.password = hashedPassword;
  return await admin.save();
};

export const deleteAdmin = async (id: string) => {
  const result = await AdminAuth.findByIdAndDelete({ _id: id });
  return result;
};
