import { model, Schema, Types } from "mongoose";

interface ITripStops extends Document {
  stopId: number;
  isArrived: boolean;
  tripId: Types.ObjectId;
  stopLocation: Types.ObjectId;
}

const tripStopsSchema = new Schema<ITripStops>(
  {
    stopId: { type: Number, required: true },
    isArrived: { type: Boolean, default: false, required: true },
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    stopLocation: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TripStops = model<ITripStops>("TripStops", tripStopsSchema);

export default TripStops;
export { ITripStops };
