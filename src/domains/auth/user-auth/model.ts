import { Document, model, Schema } from "mongoose";

interface IUserAuth extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userAuthSchema = new Schema<IUserAuth>(
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

const UserAuth = model<IUserAuth>("UserAuth", userAuthSchema);

export default UserAuth;
export { IUserAuth };
