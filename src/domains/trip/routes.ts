import express from "express";
import {
  createTripController,
  getSingleTripController,
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

export default tripRouter;
