import { NextFunction, Request, Response } from "express";
import { validateTripStopRequest } from "../../utils/validators.js";
import {
  createTripStops,
  deleteTripStop,
  findTripStopById,
} from "./service.js";
import { findTripById } from "../trip/service.js";
import { findLocationById } from "../location/service.js";

export const createTripStopController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateTripStopRequest(req.body);
    if (error) {
      res.status(400).json({
        message: "Validation failed.",
        error: error.details[0].message,
      });
      return;
    }

    const { stopId, tripId, stopLocation } = req.body;
    if (!(await findTripById(tripId))) {
      res.status(404).json({ message: "Trip not found." });
      return;
    }

    if (!(await findLocationById(stopLocation))) {
      console.log("Inside location check");
      res.status(404).json({ message: "Location not found." });
      return;
    }

    const response = await createTripStops(stopId, tripId, stopLocation);

    res
      .status(200)
      .json({ message: "Trip stop saved successfully.", date: response });
    return;
  } catch (err) {
    next(err);
  }
};

export const deleteTripStopController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!(await findTripStopById(id))) {
      res.status(404).json({ message: "Trip stop not found." });
      return;
    }

    await deleteTripStop(id);

    res.status(200).json({ message: "Trip stop deleted successfully." });
    return;
  } catch (err) {
    next(err);
  }
};
