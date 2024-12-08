import express from "express";
import userAuthRouter from "./user-auth/routes.js";
import driverAuthRouter from "./driver-auth/routes.js";
import adminAuthRouter from "./admin-auth/routes.js";
import { getProfileController } from "./controller.js";
import authenticateToken from "../../middleware/auth-handler-middleware.js";

const authRouter = express.Router();

authRouter.use("/user", userAuthRouter);
authRouter.use("/driver", driverAuthRouter);
authRouter.use("/admin", adminAuthRouter);
authRouter.get("/profile", authenticateToken, getProfileController);

export default authRouter;
