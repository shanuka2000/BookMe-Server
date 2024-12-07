import { NextFunction, Request, Response } from "express";
import {
  createBus,
  deleteBus,
  findById,
  getAllBuses,
  getBus,
  patchBus,
} from "./service.js";
import {
  validateBusPatch,
  validateBusRegister,
} from "../../utils/validators.js";

export const getBusesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const buses = await getAllBuses();

    res.status(200).json({ message: "Buses fetched successfully", buses });
    return;
  } catch (err) {
    next(err);
  }
};

export const getBusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const bus = await getBus(id);
    if (!bus) {
      res.status(404).json({ message: "Resource not found." });
      return;
    }
    res.status(200).json({ message: "Bus fetched successfully", data: bus });
    return;
  } catch (err) {
    next(err);
  }
};

export const createBusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateBusRegister(req.body);
    if (error) {
      res.status(400).json({
        message: "Validation failed.",
        error: error.details[0].message,
      });
      return;
    }

    const { busNumber, totalSeatsAvailable } = req.body;

    const bus = await createBus(busNumber, totalSeatsAvailable);

    res.status(200).json({ message: "Bus created successfully.", data: bus });
    return;
  } catch (err) {
    next(err);
  }
};

export const putBusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Implement if needed
  } catch (err) {
    next(err);
  }
};

export const patchBusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateBusPatch(req.body);
    if (error) {
      res.status(400).json({
        message: "Validation failed.",
        error: error.details[0].message,
      });
      return;
    }
    const { id } = req.params;
    const { totalSeatsAvailable } = req.body;

    const bus = await patchBus(id, totalSeatsAvailable);
    res
      .status(200)
      .json({ message: "Bus details patched successfully.", data: bus });
    return;
  } catch (err) {
    next(err);
  }
};

export const deletehBusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const bus = await findById(id);
    if (!bus) {
      res.status(404).json({ message: "The bus was not found." });
    }

    await deleteBus(id);
    res.status(200).json({ message: "The bus was deleted successfully.", bus });
    return;
  } catch (err) {
    next(err);
  }
};
