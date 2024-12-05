import {
  ACCESS_TOKEN_EXPIRE_IN,
  ACCESS_TOKEN_SECRET,
} from "../config/env-export-config.js";
import { IAdminAuth } from "../domains/auth/admin-auth/model.js";
import { IDriverAuth } from "../domains/auth/driver-auth/model.js";
import { IUserAuth } from "../domains/auth/user-auth/model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = ACCESS_TOKEN_SECRET || "123";
const JWT_EXPIRES_IN = ACCESS_TOKEN_EXPIRE_IN || "1h";

export const generateUserAccessToken = (user: IUserAuth) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: "passenger",
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return token;
};

export const generateDriverAccessToken = (driver: IDriverAuth) => {
  const token = jwt.sign(
    {
      id: driver._id,
      email: driver.email,
      role: "driver",
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return token;
};

export const generateAdminAccessToken = (admin: IAdminAuth) => {
  const token = jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      role: "admin",
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return token;
};
