import { Schema } from "mongoose";

export interface MongoParams {
  _id: Schema.Types.ObjectId;
  __v: number;
}