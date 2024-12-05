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

  let distance;
  let duration;
  let tripCreationStatus;

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
