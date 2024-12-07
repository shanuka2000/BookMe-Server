import express from "express";
import authRouter from "../domains/auth/routes.js";
import locationRouter from "../domains/location/routes.js";
import busRouter from "../domains/bus/routes.js";
import tripRouter from "../domains/trip/routes.js";
import tripStopsRouter from "../domains/trip-stops/routes.js";
import authenticateToken from "../middleware/auth-handler-middleware.js";

const routerV1 = express.Router();

routerV1.use("/auth", authenticateToken, authRouter);
routerV1.use("/location", authenticateToken, locationRouter);
routerV1.use("/bus", authenticateToken, busRouter);
routerV1.use("/trip", authenticateToken, tripRouter);
routerV1.use("/trip-stops", authenticateToken, tripStopsRouter);

export default routerV1;
