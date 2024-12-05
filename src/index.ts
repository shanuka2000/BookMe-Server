import server from "./server.js";
import { connectToDatabase } from "./config/db-config.js";
import dotenv from "dotenv";
import { PORT } from "./config/env-export-config.js";

dotenv.config();

const port = PORT || 5000;

const startServer = async () => {
  try {
    const serverStatus = server.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
    await connectToDatabase();
  } catch (error) {
    console.error("⚡️[server]: Failed to start server:", error);
  }
};

startServer();
