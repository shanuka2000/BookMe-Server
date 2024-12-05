import mongoose from "mongoose";
import { MONGO_URI_ENV } from "./env-export-config.js";

let MONGO_URI = MONGO_URI_ENV;

export const connectToDatabase = async (): Promise<void> => {
  try {
    console.log("⚡️[server]: Atempting to connect with MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("⚡️[server]: Connection succeeded with MongoDB");
  } catch (err) {
    console.error("⚡️[server]: Failed to connect to MongoDB!: ", err);
    throw err;
  }
};
