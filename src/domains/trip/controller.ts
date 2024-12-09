import { NextFunction, Request, Response } from "express";
import {
  calculateTrips,
  completeTripCreation,
  findSingleTrip,
  findTripById,
  initialiseTrip,
  patchTripStatus,
} from "./service.js";
import {
  validatePatchTripRequest,
  validatePatchTripStatusRequest,
} from "../../utils/validators.js";
import { findById as findBusById } from "../bus/service.js";
import { findById as findDriverById } from "../auth/driver-auth/service.js";
import Trip from "./model.js";

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

export const patchTripStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("In patch");
    const { error } = validatePatchTripStatusRequest(req.body);
    if (error) {
      res.status(400).json({
        message: "Validation failed.",
        error: error.details[0].message,
      });
      return;
    }
    const { id } = req.params;
    if (!(await findTripById(id))) {
      res.status(404).json({ message: "Trip not found." });
      return;
    }

    const { status } = req.body;

    await patchTripStatus(id, status);
    res.status(200).json({ message: "Trip patched successfully." });
    return;
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

export const getTripsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const startLocation = req.query.startLocation as string | undefined;
    const endLocation = req.query.endLocation as string | undefined;
    const startDate = req.query.startDate as string | undefined;
    const seats = req.query.seats as string | undefined;

    if (!startLocation && !endLocation && !startDate && !seats) {
      const trips = await Trip.find();
      res.status(200).json({
        message: "All trips fetched successfully",
        data: trips,
      });
      return;
    }

    let date;
    if (startDate) {
      date = new Date(startDate);
      if (isNaN(date.getTime())) {
        res.status(400).json({ message: "Invalid date format." });
        return;
      }
    }

    if (!startLocation || !endLocation) {
      res.status(400).json({
        message: "Both startLocation and endLocation are required.",
      });
      return;
    }

    const response = await calculateTrips(
      startLocation,
      endLocation,
      date,
      seats
    );

    if (!response || response.length === 0) {
      res
        .status(404)
        .json({ message: "No trips found matching your criteria." });
      return;
    }

    res.status(200).json({
      message: "Trips fetched successfully",
      data: response,
    });
    return;
  } catch (err) {
    next(err);
  }
};

export const getSingleTripController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const response = await findSingleTrip(id);

    if (!response) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Trip fetched successfully", data: response });
    return;
  } catch (err) {
    next(err);
  }
};
