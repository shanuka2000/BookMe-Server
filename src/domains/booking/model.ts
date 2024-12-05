import { model, Schema, Types } from "mongoose";

interface IBooking extends Document {
  bookedBy: Types.ObjectId;
  bookingPrice: number;
  seats: number;
}

const bookingSchema = new Schema<IBooking>(
  {
    bookedBy: { type: Schema.Types.ObjectId, ref: "UserAuth", required: true },
    bookingPrice: { type: Number, required: true },
    seats: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Booking = model<IBooking>("Booking", bookingSchema);

export default Booking;
export { IBooking };
