import express from "express";
import { createTripController, patchTripController } from "./controller.js";

const tripRouter = express.Router();

tripRouter.post("/", createTripController);
tripRouter.patch("/:id", patchTripController);

export default tripRouter;
