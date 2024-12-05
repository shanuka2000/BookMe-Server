import express from "express";
import {
  deleteUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
  resetPasswordController,
} from "./controller.js";
import authenticateToken from "../../../middleware/auth-handler-middleware.js";

const userAuthRouter = express.Router();

userAuthRouter.post("/register", registerUserController);
userAuthRouter.post("/login", loginUserController);
userAuthRouter.post("/logout", authenticateToken, logoutUserController);
userAuthRouter.patch("/reset/:id", authenticateToken, resetPasswordController);
userAuthRouter.delete("/delete/:id", authenticateToken, deleteUserController);

export default userAuthRouter;
