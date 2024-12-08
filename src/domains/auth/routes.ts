import express from "express";
import userAuthRouter from "./user-auth/routes.js";
import driverAuthRouter from "./driver-auth/routes.js";
import adminAuthRouter from "./admin-auth/routes.js";
import { getProfileController } from "./controller.js";

const authRouter = express.Router();

authRouter.use("/user", userAuthRouter);
authRouter.use("/driver", driverAuthRouter);
authRouter.use("/admin", adminAuthRouter);
authRouter.get("/profile", getProfileController);

export default authRouter;
