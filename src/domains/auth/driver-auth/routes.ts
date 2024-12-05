import express from "express";
import {
  deleteDriverController,
  loginDriverController,
  logoutDriverController,
  registerDriverController,
  resetDriverPasswordController,
} from "./controller.js";
import authenticateToken from "../../../middleware/auth-handler-middleware.js";

const driverAuthRouter = express.Router();

driverAuthRouter.post("/register", registerDriverController);
driverAuthRouter.post("/login", loginDriverController);
driverAuthRouter.post("/logout", authenticateToken, logoutDriverController);
driverAuthRouter.patch(
  "/reset/:id",
  authenticateToken,
  resetDriverPasswordController
);
driverAuthRouter.delete(
  "/delete/:id",
  authenticateToken,
  deleteDriverController
);

export default driverAuthRouter;
