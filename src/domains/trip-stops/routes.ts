import express from "express";
import {
  createTripStopController,
  deleteTripStopController,
  getTripStopsByTripIdController,
} from "./controller.js";

const tripStopsRouter = express.Router();

tripStopsRouter.post("/", createTripStopController);
tripStopsRouter.get("/:id", getTripStopsByTripIdController);
tripStopsRouter.delete("/:id", deleteTripStopController);

export default tripStopsRouter;
