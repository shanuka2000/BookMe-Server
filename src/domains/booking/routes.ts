import express from "express";
import {
  createBookingContoller,
  patchBookingController,
} from "./controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBookingContoller);
bookingRouter.post("/:id", patchBookingController);

export default bookingRouter;
