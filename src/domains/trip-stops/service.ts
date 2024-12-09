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

  const updateTrip = await Trip.findByIdAndUpdate(
    tripId,
    {
      $push: { stops: response._id },
      tripCreationStatus: "2",
    },
    { new: true }
  );

  if (!updateTrip) {
    TripStops.findByIdAndDelete(response._id);
    throw new Error("Saved stop but failed to update trip.");
  }

  return response;
};

export const findTripStopById = async (id: string): Promise<boolean> => {
  return !!(await TripStops.findById(id));
};

export const getAllTripStopsForTripId = async (id: string) => {
  return await TripStops.find({ tripId: id }).populate("stopLocation");
};

export const deleteTripStop = async (id: string) => {
  const TripStop = await TripStops.findById(id);

  const updateTrip = await Trip.findByIdAndUpdate(
    TripStop.tripId,
    {
      $pull: { stops: id },
    },
    { new: true }
  );

  if (!updateTrip) {
    throw new Error("Failed to update trip.");
  }

  const result = await TripStops.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Failed to delete trip stop.");
  }
};

export const patchTripStop = async (
  id: string,
  tripId: string,
  isArrived: boolean
) => {
  const trip = await Trip.findById(tripId);
  if (!trip) {
    throw new Error("Failed to update due not trip not found.");
  }

  if (trip.status != "on_going") {
    throw new Error("Failed to update due to trip not started.");
  }

  const tripStopToUpdate = await TripStops.findById(id);

  if (tripStopToUpdate.stopId > 1) {
    const checkTripStop = await TripStops.findOne({
      stopId: tripStopToUpdate.stopId - 1,
    });

    if (!checkTripStop.isArrived) {
      throw new Error(
        "Failed to update due to attempt to break stop sequence."
      );
    }
  }

  const updateTripStop = await TripStops.findByIdAndUpdate(
    id,
    {
      isArrived,
    },
    { new: true }
  );

  if (!updateTripStop) {
    throw new Error("Failed to update trip stop.");
  }

  return updateTripStop;
};
