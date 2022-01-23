import { model, Schema } from "mongoose";
import { v4 } from "uuid";

//the UserCode interface interface
export interface IUserCode {
  date: Date;
  code: string;
}

//the user interface
export interface IUser {
  _id: string;
  codes: IUserCode[];
  email: string;
  hashedPassword: string;
}

//create the user schema
const UserSchema = new Schema<IUser>({
  _id: {
    type: String,
    required: true,
    default: v4,
  },
  codes: {
    type: [],
    required: true,
    default: [],
  },
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

//create the user model
export const UserModel = model("User", UserSchema);
