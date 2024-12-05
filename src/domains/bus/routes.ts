import express from "express";
import {
  createBusController,
  deletehBusController,
  getBusController,
  getBusesController,
  patchBusController,
  putBusController,
} from "./controller.js";

const busRouter = express.Router();

busRouter.get("/", getBusesController);
busRouter.get("/:id", getBusController);
busRouter.post("/", createBusController);
busRouter.put("/:id", putBusController);
busRouter.patch("/:id", patchBusController);
busRouter.delete("/:id", deletehBusController);

export default busRouter;
