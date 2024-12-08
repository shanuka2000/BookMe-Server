import Booking from "../domains/booking/model.js";
import Bus from "../domains/bus/model.js";
import TripStops from "../domains/trip-stops/model.js";
import Trip from "../domains/trip/model.js";

export const countRemaningSeats = async (
  tripId: string,
  needSeats: number
): Promise<boolean> => {
  const trip = await Trip.findById(tripId);
  const bus = await Bus.findById(trip.busId);

  const totalSeats = bus.totalSeatsAvailable;

  const bookings = await Booking.find({ tripId }).exec();
  let totCount: number = 0;

  for (const booking of bookings) {
    totCount += booking.seats;
  }

  if (totCount <= totalSeats && needSeats + totCount <= totalSeats) {
    return true;
  } else {
    return false;
  }
};

export const calculatePrice = async (
  tripId: string,
  seats: number,
  bookingFrom: string,
  bookingTo: string
): Promise<number> => {
  const trip = await Trip.findById(tripId);
  const bookingFromLoc = await TripStops.findOne({ stopLocation: bookingFrom });
  const bookingToLoc = await TripStops.findOne({ stopLocation: bookingTo });

  if (bookingFromLoc && bookingToLoc) {
    // canculate from stop id
    const fronStopId = bookingFromLoc.stopId;
    const endStopId = bookingToLoc.stopId;
    const numOfStops = endStopId - fronStopId;
    const totalStops = trip.stops.length - 1 + 2;
    const priceForOneStop = trip.fullTripSeatPrice / totalStops;
    const finalPrice = priceForOneStop * numOfStops * seats;
    return finalPrice;
  } else if (!bookingFromLoc && !bookingToLoc) {
    // return full trip price
    return trip.fullTripSeatPrice * seats;
  } else if (bookingFromLoc && !bookingToLoc) {
    // start cal from booking from Loc to full trip end
    const fromStopId = bookingFromLoc.stopId;
    const endStopId = trip.stops.length;
    const numOfStops = endStopId - fromStopId + 1;
    const totalStops = trip.stops.length - 1 + 2;
    const priceForOneStop = trip.fullTripSeatPrice / totalStops;
    const finalPrice = priceForOneStop * numOfStops * seats;
    return finalPrice;
  } else if (!bookingFromLoc && bookingToLoc) {
    // start cal from trip start to booking to Loc
    const endStopId = bookingToLoc.stopId - 1;
    const numOfStops = endStopId + 1;
    const totalStops = trip.stops.length - 1 + 2;
    const priceForOneStop = trip.fullTripSeatPrice / totalStops;
    const finalPrice = priceForOneStop * numOfStops * seats;
    return finalPrice;
  } else {
    return 0;
  }
};
