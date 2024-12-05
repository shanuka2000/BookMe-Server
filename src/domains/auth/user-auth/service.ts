import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth-handler-middleware.js";
import { hashPassword } from "../../../utils/password-hash.js";
import UserAuth, { IUserAuth } from "./model.js";
import { NODE_ENV } from "../../../config/env-export-config.js";

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<IUserAuth> => {
  const hashedPassword = await hashPassword(password);
  const user = new UserAuth({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  return await user.save();
};

export const isEmailTaken = async (email: string): Promise<boolean> => {
  return !!(await UserAuth.findOne({ email }));
};

export const findUserByEmail = async (
  email: string
): Promise<IUserAuth | null> => {
  return UserAuth.findOne({ email });
};

export const findById = async (id: string): Promise<IUserAuth | null> => {
  return UserAuth.findById(id);
};

export const logoutUser = async (req: AuthRequest, res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const resetPassword = async (id: string, newPassword: string) => {
  const user = await UserAuth.findById({ _id: id });
  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  return await user.save();
};

export const deleteUser = async (id: string) => {
  const result = await UserAuth.findByIdAndDelete({ _id: id });
  return result;
};
