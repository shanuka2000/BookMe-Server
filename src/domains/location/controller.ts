import { NextFunction, Request, Response } from "express";
import {
  createLocation,
  getAllLocations,
  getLocation,
  updateLocation,
} from "./service.js";
import { validateLocationRequest } from "../../utils/validators.js";
import AdminAuth from "../auth/admin-auth/model.js";

export const createLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { placeId, registeredBy } = req.body;

    const { error } = validateLocationRequest(req.body);
    if (error) {
      res.status(400).json({
        message: "Validation failed.",
        error: error.details[0].message,
      });
      return;
    }

    const admin = await AdminAuth.findById({ _id: registeredBy });

    if (!admin) {
      res.status(400).json({
        message: "Validation failed",
        error: "Action creator id required.",
      });
    }

    const location = await createLocation(placeId, admin);

    res
      .status(200)
      .json({ message: "Location created successfully.", data: location });
    return;
  } catch (err) {
    if (err.message === "Location is already registered.") {
      res.status(409).json({ message: err.message });
    } else {
      next(err);
    }
  }
};

export const patchLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { placeId } = req.body;
    const { id } = req.params;

    const { error } = validateLocationRequest(req.body);
    if (error) {
      res.status(400).json({
        message: "Validation failed.",
        error: error.details[0].message,
      });
      return;
    }

    if (!id) {
      res.status(400).json({
        message: "Validation failed.",
        error: "Resource id not valid.",
      });
    }

    const location = await updateLocation(id, placeId);

    res
      .status(201)
      .json({ message: "Location updated successfully", data: location });
  } catch (err) {
    if (err.message === "Location is already registered.") {
      res.status(409).json({ message: err.message });
    } else {
      next(err);
    }
  }
};

export const getLocationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locations = await getAllLocations();

    res
      .status(200)
      .json({ message: "Locations fetched successfully", data: locations });
    return;
  } catch (err) {
    next(err);
  }
};

export const getLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const location = await getLocation(id);
    if (!location) {
      res.status(404).json({ message: "Resource not found." });
      return;
    }
    res
      .status(200)
      .json({ message: "Location fetched successfully", data: location });
    return;
  } catch (err) {
    next(err);
  }
};
