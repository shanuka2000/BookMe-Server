import express from "express";
import { createTripStopController } from "./controller.js";

const tripStopsRouter = express.Router();

tripStopsRouter.post("/", createTripStopController);

export default tripStopsRouter;
