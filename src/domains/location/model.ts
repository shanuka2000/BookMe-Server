import { model, Schema, Types } from "mongoose";

interface ILocation extends Document {
  displayName: string;
  slug: string;
  locationUrl: string;
  locationLongitude: number;
  locationLatitude: number;
  locationPlaceId: string;
  registeredBy: Types.ObjectId[];
}

const locationSchema = new Schema<ILocation>(
  {
    displayName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    locationUrl: { type: String, required: true },
    locationLongitude: { type: Number, required: true },
    locationLatitude: { type: Number, required: true },
    locationPlaceId: { type: String, required: true },
    registeredBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "AdminAuth",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Location = model<ILocation>("Location", locationSchema);

export default Location;
export { ILocation };
