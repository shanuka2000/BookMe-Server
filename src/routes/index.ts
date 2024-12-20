import express from "express";
import authRouter from "../domains/auth/routes.js";
import locationRouter from "../domains/location/routes.js";
import busRouter from "../domains/bus/routes.js";
import tripRouter from "../domains/trip/routes.js";
import tripStopsRouter from "../domains/trip-stops/routes.js";
import authenticateToken from "../middleware/auth-handler-middleware.js";
import bookingRouter from "../domains/booking/routes.js";

const routerV1 = express.Router();

routerV1.use("/auth", authRouter);
routerV1.use("/location", locationRouter);
routerV1.use("/bus", busRouter);
routerV1.use("/trip", tripRouter);
routerV1.use("/trip-stops", tripStopsRouter);
routerV1.use("/booking", bookingRouter);

export default routerV1;
