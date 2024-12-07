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
  const bookingFromLoc = await TripStops.findById(bookingFrom);
  const bookingToLoc = await TripStops.findById(bookingTo);

  if (
    trip.startLocation === bookingFromLoc._id &&
    trip.endLocation === bookingToLoc._id
  ) {
    return trip.fullTripSeatPrice;
  } else if (
    trip.startLocation === bookingFromLoc._id &&
    trip.endLocation != bookingToLoc._id
  ) {
    const toStopId = bookingFromLoc.stopId;
    const totalStops = trip.stops.length + 2;
    const priceForOneStop = trip.fullTripSeatPrice / totalStops;
    const totalPrice = priceForOneStop * toStopId * seats;
    return totalPrice;
  } else if (
    trip.startLocation != bookingFromLoc._id &&
    trip.endLocation === bookingToLoc._id
  ) {
    const fromStopId = bookingFromLoc.stopId;
    const totalStops = trip.stops.length + 2;
    const priceForOneStop = trip.fullTripSeatPrice / totalStops;
    const totalPrice = priceForOneStop * (totalStops - fromStopId) * seats;
    return totalPrice;
  } else {
    const fromStopId = bookingFromLoc.stopId;
    const toStopId = bookingFromLoc.stopId;
    const numStops = toStopId - fromStopId;
    const totalStops = trip.stops.length + 2;
    const priceForOneStop = trip.fullTripSeatPrice / totalStops;
    const totalPrice = priceForOneStop * numStops * seats;
    return totalPrice;
  }
};
