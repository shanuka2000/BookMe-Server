import Trip from "../trip/model.js";
import TripStops from "./model.js";

export const createTripStops = async (
  stopId: number,
  tripId: string,
  stopLocation: string
) => {
  const tripStop = !!(await TripStops.findOne({
    stopId,
    tripId,
    stopLocation,
  }));

  if (tripStop) {
    throw new Error("Record already exists");
  }

  const newTripStop = new TripStops({
    stopId,
    tripId,
    stopLocation,
  });

  const response = await newTripStop.save();

  if (!response) {
    throw new Error("Failed to save trip stop.");
  }

  const updateTrip = await Trip.findByIdAndUpdate(tripId, {
    $push: { stops: response._id },
  });

  if (!updateTrip) {
    TripStops.findByIdAndDelete(response._id);
    throw new Error("Saved stop but failed to update trip.");
  }

  return response;
};
