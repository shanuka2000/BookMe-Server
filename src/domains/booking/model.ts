import { model, Schema, Types } from "mongoose";

interface IBooking extends Document {
  bookedBy: Types.ObjectId;
  bookingPrice: number;
  tripId: Types.ObjectId;
  seats: number;
  bookingFrom: Types.ObjectId;
  bookingTo: Types.ObjectId;
  bookingStatus:
    | "reserved"
    | "confirmed"
    | "cancelled"
    | "abandoned"
    | "completed";
  cancellationExpireAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    bookedBy: { type: Schema.Types.ObjectId, ref: "UserAuth", required: true },
    bookingPrice: { type: Number, required: true },
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    seats: { type: Number, required: true },
    bookingFrom: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    bookingTo: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    bookingStatus: { type: String, default: "reserved", required: false },
    cancellationExpireAt: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

const Booking = model<IBooking>("Booking", bookingSchema);

export default Booking;
export { IBooking };
