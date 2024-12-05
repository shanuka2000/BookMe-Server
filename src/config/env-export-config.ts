import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT as string;
export const MONGO_URI_ENV = process.env.MONGO_URI as string;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
export const ACCESS_TOKEN_EXPIRE_IN = process.env
  .ACCESS_TOKEN_EXPIRE_IN as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export const GOOGLE_API = process.env.GOOGLE_API as string;
