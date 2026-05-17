import { Schema, model, Document,Types } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  status: "new" | "contacted" | "qualified" | "lost";
  source: "website" | "instagram" | "referral";
  createdBy:Types.ObjectId
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new",
    },

    source: {
      type: String,
      enum: ["website", "instagram", "referral"],
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Lead = model<ILead>("Lead", leadSchema);

export default Lead;
