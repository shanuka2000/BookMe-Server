import express from "express";
import {
  createLocationController,
  getLocationController,
  getLocationsController,
  patchLocationController,
} from "./controller.js";

const locationRouter = express.Router();

locationRouter.get("/", getLocationsController);
locationRouter.get("/:id", getLocationController);
locationRouter.post("/", createLocationController);
locationRouter.patch("/:id", patchLocationController);

export default locationRouter;
