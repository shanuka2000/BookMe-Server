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

export const calculateTrips = async (
  startLocation: string | undefined,
  endLocation: string | undefined,
  date: Date | undefined,
  seats: string | undefined
) => {
  const query: any = {};

  if (date) {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    query.satrtDate = { $gte: startOfDay, $lte: endOfDay };
  }

  const trips = await Trip.find(query)
    .populate("busId")
    .populate("startLocation")
    .populate("endLocation")
    .populate("stops");

  if (!trips) {
    return [];
  }

  const filteredTrips = trips.filter((trip) => {
    const tripStartLocation = trip.startLocation._id.toString();
    const tripEndLocation = trip.endLocation._id.toString();
    const tripStops = trip.stops.map((stop) => stop._id.toString());

    const startLocationMatches =
      startLocation &&
      (tripStartLocation === startLocation ||
        tripStops.includes(startLocation));
    const endLocationMatches =
      endLocation &&
      (tripEndLocation === endLocation || tripStops.includes(endLocation));

    return (
      (!startLocation || startLocationMatches) &&
      (!endLocation || endLocationMatches)
    );
  });

  return filteredTrips;
};

export const findSingleTrip = async (id: string) => {
  return await Trip.findById(id)
    .populate("busId")
    .populate("startLocation")
    .populate("endLocation")
    .populate("stops");
};
