import { NextFunction, Request, Response } from "express";
import { validateBookingCreateRequest } from "../../utils/validators.js";
import { findById } from "../auth/user-auth/service.js";
import { findTripById } from "../trip/service.js";
import { findLocationById } from "../location/service.js";
import {
  createBooking,
  findBookingById,
  updateBookingStatus,
} from "./service.js";

export const createBookingContoller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateBookingCreateRequest(req.body);
    if (error) {
      res.status(400).json({
        message: "Validation failed.",
        error: error.details[0].message,
      });
      return;
    }
    const { bookedBy, tripId, seats, bookingFrom, bookingTo } = req.body;

    const user = await findById(bookedBy);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    if (!(await findTripById(tripId))) {
      res.status(404).json({ message: "Trip not found." });
      return;
    }
    if (!(await findLocationById(bookingFrom))) {
      res.status(404).json({ message: "Booking from loaction not found." });
      return;
    }
    if (!(await findLocationById(bookingTo))) {
      res.status(404).json({ message: "Booking to loaction not found." });
      return;
    }

    const response = await createBooking(
      bookedBy,
      tripId,
      seats,
      bookingFrom,
      bookingTo
    );

    res
      .status(200)
      .json({ message: "Booking created successfully.", date: response });
    return;
  } catch (err) {
    next(err);
  }
};

export const patchBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { bookingStatus } = req.body;

    if (!(await findBookingById(id))) {
      res.status(404).json({ message: "Booking not found." });
      return;
    }

    const validBookingStatus = [
      "reserved",
      "confirmed",
      "cancelled",
      "abandoned",
    ];
    if (!validBookingStatus.includes(bookingStatus)) {
      res.status(400).json({
        message: "Validation failed.",
        error: "Invalid booking status.",
      });
      return;
    }

    const response = await updateBookingStatus(id, bookingStatus);
    res
      .status(200)
      .json({ message: "Booking updated successfully.", date: response });
    return;
  } catch (err) {
    next(err);
  }
};
