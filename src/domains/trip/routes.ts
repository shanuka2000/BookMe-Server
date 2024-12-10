import express from "express";
import {
  createTripController,
  getSingleTripController,
  getTripsByDriverIdController,
  getTripsController,
  patchTripController,
  patchTripStatusController,
} from "./controller.js";

const tripRouter = express.Router();

tripRouter.post("/", createTripController);
tripRouter.patch("/:id", patchTripController);
tripRouter.patch("/status/:id", patchTripStatusController);
tripRouter.get("/", getTripsController);
tripRouter.get("/:id", getSingleTripController);
tripRouter.get("/byDriver/:id", getTripsByDriverIdController);

export default tripRouter;
