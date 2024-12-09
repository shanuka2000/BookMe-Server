import express from "express";
import {
  createTripStopController,
  deleteTripStopController,
  getTripStopsByTripIdController,
  patchTripStopStatusController,
} from "./controller.js";

const tripStopsRouter = express.Router();

tripStopsRouter.post("/", createTripStopController);
tripStopsRouter.get("/:id", getTripStopsByTripIdController);
tripStopsRouter.patch("/status/:id", patchTripStopStatusController);
tripStopsRouter.delete("/:id", deleteTripStopController);

export default tripStopsRouter;
