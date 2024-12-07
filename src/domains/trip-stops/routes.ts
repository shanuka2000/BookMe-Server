import express from "express";
import {
  createTripStopController,
  deleteTripStopController,
} from "./controller.js";

const tripStopsRouter = express.Router();

tripStopsRouter.post("/", createTripStopController);
tripStopsRouter.delete("/:id", deleteTripStopController);

export default tripStopsRouter;
