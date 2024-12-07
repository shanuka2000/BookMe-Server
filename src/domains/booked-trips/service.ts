import { findBookingById } from "../booking/service.js";
import { findTripById } from "../trip/service.js";
import BookedTrip from "./model.js";

export const createBookedTrip = async (
  bookingId: string,
  tripId: string
): Promise<boolean> => {
  const validateBooking = await findBookingById(bookingId);
  const validateTrip = await findTripById(tripId);

  if (validateBooking && validateTrip) {
    const bookedTrip = new BookedTrip({ bookingId, tripId });
    const result = bookedTrip.save();

    if (result) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
