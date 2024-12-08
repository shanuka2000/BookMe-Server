import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routerV1 from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler-middleware.js";
import { CLIENT_URL } from "./config/env-export-config.js";

const app: Express = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/v1", routerV1);
app.use(errorHandler);

export default app;
