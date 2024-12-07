import express from "express";
import { createBookingContoller } from "./controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBookingContoller);

export default bookingRouter;
