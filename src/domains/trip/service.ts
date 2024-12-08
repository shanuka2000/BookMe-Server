import { error } from "console";
import { getDistanceDetails } from "../../utils/location-support.js";
import Location from "../location/model.js";
import Trip from "./model.js";

export const initialiseTrip = async (
  startLocation: string,
  endLocation: string,
  satrtDate: Date,
  endDate: Date,
  startTime: string,
  endTime: string
) => {
  const startLoc = await Location.findById(startLocation);
  if (!startLoc) {
    throw new Error("Start location not found.");
  }

  const endLoc = await Location.findById(endLocation);
  if (!endLoc) {
    throw new Error("End location not found.");
  }

  const distanceDetails = await getDistanceDetails(startLoc, endLoc);

  let distance: string;
  let duration: string;
  let tripCreationStatus: "0" | "1" | "2" | "3";

  if (
    distanceDetails &&
    distanceDetails.rows.length > 0 &&
    distanceDetails.rows[0].elements.length > 0 &&
    distanceDetails.rows[0].elements[0].status === "OK"
  ) {
    distance = distanceDetails.rows[0].elements[0].distance.text;
    duration = distanceDetails.rows[0].elements[0].duration.text;

    if (distance && duration) {
      tripCreationStatus = "1";
    } else {
      tripCreationStatus = "0";
    }
  }

  const trip = new Trip({
    startLocation: startLoc._id,
    endLocation: endLoc._id,
    satrtDate,
    endDate,
    startTime,
    endTime,
    distance: distance,
    duration: duration,
    tripCreationStatus: tripCreationStatus,
  });

  return await trip.save();
};

export const findTripById = async (id: string): Promise<boolean> => {
  return !!(await Trip.findById(id));
};

export const completeTripCreation = async (
  id: string,
  busId: string,
  fullTripSeatPrice: number,
  driver: string
) => {
  const trip = await Trip.findById(id);
  if (trip.tripCreationStatus === "1") {
    throw new Error("Please complete stage 2 before stage 3.");
  }

  const result = Trip.findByIdAndUpdate(
    id,
    {
      busId,
      fullTripSeatPrice,
      driver,
      tripCreationStatus: "3",
    },
    { new: true }
  );

  if (!result) {
    throw new Error("Failed to update trip.");
  }

  return result;
};
