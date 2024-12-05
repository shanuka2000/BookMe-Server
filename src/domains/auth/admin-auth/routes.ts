import express from "express";
import authenticateToken from "../../../middleware/auth-handler-middleware.js";
import {
  deleteAdminController,
  loginAdminController,
  logoutAdminController,
  registerAdminController,
  resetAdminPasswordController,
} from "./controller.js";

const adminAuthRouter = express.Router();

adminAuthRouter.post("/register", registerAdminController);
adminAuthRouter.post("/login", loginAdminController);
adminAuthRouter.post("/logout", authenticateToken, logoutAdminController);
adminAuthRouter.patch(
  "/reset/:id",
  authenticateToken,
  resetAdminPasswordController
);
adminAuthRouter.delete("/delete/:id", authenticateToken, deleteAdminController);

export default adminAuthRouter;
