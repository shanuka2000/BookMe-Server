import { model, Schema, Types } from "mongoose";

interface IBookedTrip extends Document {
  tripId: Types.ObjectId;
  bookingId: Types.ObjectId;
}

const bookedTripSchema = new Schema<IBookedTrip>(
  {
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
  },
  {
    timestamps: true,
  }
);

const BookedTrip = model<IBookedTrip>("BookedTrip", bookedTripSchema);

export default BookedTrip;
export { IBookedTrip };
