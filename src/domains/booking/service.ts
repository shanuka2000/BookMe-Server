import {
  calculatePrice,
  countRemaningSeats,
} from "../../utils/trip-support.js";
import { createBookedTrip } from "../booked-trips/service.js";
import Booking from "./model.js";

export const createBooking = async (
  bookedBy: string,
  tripId: string,
  seats: number,
  bookingFrom: string,
  bookingTo: string
) => {
  const isSeatsAvailable = await countRemaningSeats(tripId, seats);
  if (!isSeatsAvailable) {
    throw new Error("Seats not available.");
  }
  const tripPrice = await calculatePrice(tripId, seats, bookingFrom, bookingTo);

  const booking = new Booking({
    bookedBy,
    bookingPrice: tripPrice,
    tripId,
    seats,
    bookingFrom,
    bookingTo,
    bookingStatus: "confirmed",
  });

  const result = await booking.save();

  if (!result) {
    throw new Error("Failed to create booking.");
  }

  const isBookedTripCreated = await createBookedTrip(
    result._id.toString(),
    tripId
  );

  if (!isBookedTripCreated) {
    throw new Error("Booking created but transaction not completed.");
  }

  return result;
};

export const updateBookingStatus = async (
  id: string,
  bookingStatus: "reserved" | "confirmed" | "cancelled" | "abandoned"
) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    { bookingStatus },
    { new: true }
  );

  return booking;
};

export const findBookingById = async (id: string): Promise<boolean> => {
  return !!(await Booking.findById(id));
};
