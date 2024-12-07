import { NextFunction, Request, Response } from "express";
import { initialiseTrip } from "./service.js";

export const createTripController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      startLocation,
      endLocation,
      satrtDate,
      endDate,
      startTime,
      endTime,
    } = req.body;

    if (startLocation === endLocation) {
      res
        .status(400)
        .json({ message: "Start and end locations cannot be the same." });
      return;
    }

    const trip = await initialiseTrip(
      startLocation,
      endLocation,
      satrtDate,
      endDate,
      startTime,
      endTime
    );

    res
      .status(200)
      .json({ message: "Trip initialized successfully.", data: trip });
  } catch (err) {
    next(err);
  }
};
