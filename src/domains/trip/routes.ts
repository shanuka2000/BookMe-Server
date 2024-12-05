import express from "express";
import { createTripController, patchStopsController } from "./controller.js";

const tripRouter = express.Router();

tripRouter.post("/", createTripController);
tripRouter.patch("/stops", patchStopsController);

export default tripRouter;
