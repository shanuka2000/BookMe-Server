import express from "express";
import {
  createBookingContoller,
  getBookingsByUserIdController,
  patchBookingController,
} from "./controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBookingContoller);
bookingRouter.post("/:id", patchBookingController);
bookingRouter.get("/:id", getBookingsByUserIdController);

export default bookingRouter;
