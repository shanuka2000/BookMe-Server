import express from "express";
import { createTripController } from "./controller.js";

const tripRouter = express.Router();

tripRouter.post("/", createTripController);

export default tripRouter;
