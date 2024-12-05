import { Document, model, Schema } from "mongoose";

interface IAdminAuth extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const adminAuthSchema = new Schema<IAdminAuth>(
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

const AdminAuth = model<IAdminAuth>("AdminAuth", adminAuthSchema);

export default AdminAuth;
export { IAdminAuth };
