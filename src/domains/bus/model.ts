import { model, Schema, Types } from "mongoose";

interface IBus extends Document {
  busNumber: string;
  totalSeatsAvailable: number;
}

const busSchema = new Schema<IBus>(
  {
    busNumber: { type: String, required: true, unique: true },
    totalSeatsAvailable: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Bus = model<IBus>("Bus", busSchema);

export default Bus;
export { IBus };
