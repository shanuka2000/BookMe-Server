import { NextFunction, Request, Response } from "express";
import {
  completeTripCreation,
  findTripById,
  initialiseTrip,
} from "./service.js";
import { validatePatchTripRequest } from "../../utils/validators.js";
import { findById as findBusById } from "../bus/service.js";
import { findById as findDriverById } from "../auth/driver-auth/service.js";

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

export const patchTripController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validatePatchTripRequest(req.body);
    if (error) {
      res.status(400).json({
        message: "Validation failed.",
        error: error.details[0].message,
      });
      return;
    }

    const { id } = req.params;
    const { busId, fullTripSeatPrice, driver } = req.body;

    if (!(await findTripById(id))) {
      res.status(404).json({ message: "Trip not found." });
      return;
    }

    const isBusAvailable = await findBusById(busId);
    if (!isBusAvailable) {
      res.status(404).json({ message: "Bus was not found." });
    }

    const isDriverAvailable = await findDriverById(driver);
    if (!isDriverAvailable) {
      res.status(404).json({ message: "Driver was not found." });
    }

    const response = await completeTripCreation(
      id,
      busId,
      fullTripSeatPrice,
      driver
    );
    res
      .status(200)
      .json({ message: "Trip creation completed.", data: response });
  } catch (err) {
    next(err);
  }
};
