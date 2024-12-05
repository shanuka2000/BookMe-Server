import { Document, model, Schema } from "mongoose";

interface IDriverAuth extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const driverAuthSchema = new Schema<IDriverAuth>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

const DriverAuth = model<IDriverAuth>("DriverAuth", driverAuthSchema);

export default DriverAuth;
export { IDriverAuth };
