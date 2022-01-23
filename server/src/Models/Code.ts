import { model, Schema } from "mongoose";
import { v4 } from "uuid";

//the scanned interface
export interface IScannedCode {
  date: Date;
  user: string;
}

//the code interface
export interface ICode {
  _id: string;
  location: string;
  item: number;
  code: string;
  scanned: IScannedCode[];
}

//create the code schema
const CodeSchema = new Schema<ICode>({
  _id: {
    type: String,
    required: true,
    default: v4,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  item: {
    type: Number,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
    unique: true,
  },
  scanned: {
    type: [],
    required: true,
    default: [],
  },
});

//create the code model
export const CodeModel = model("Code", CodeSchema);
