import { model, Schema, Types } from "mongoose";

interface ITrip extends Document {
  startLocation: Types.ObjectId;
  endLocation: Types.ObjectId;
  satrtDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  distance: string;
  duration: string;
  stops: Types.ObjectId[];
  busId: Types.ObjectId;
  seatPrice: number;
  driver: Types.ObjectId;
  status: "not_started" | "on_going" | "completed";
  tripCreationStatus: "0" | "1" | "2" | "3";
}

const tripSchema = new Schema<ITrip>(
  {
    startLocation: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      default: null,
      required: true,
    },
    endLocation: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      default: null,
      required: true,
    },
    satrtDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    distance: { type: String, required: false },
    duration: { type: String, required: false },
    stops: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
        default: [],
        required: false,
      },
    ],
    busId: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
      default: null,
      required: false,
    },
    seatPrice: { type: Number, required: false },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "DriverAuth",
      default: null,
      required: false,
    },
    status: { type: String, default: "not_started", required: false },
    tripCreationStatus: { type: String, default: "0", required: false },
  },
  {
    timestamps: true,
  }
);

const Trip = model<ITrip>("Trip", tripSchema);

export default Trip;
export { ITrip };
