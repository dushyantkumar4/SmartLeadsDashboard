import { Schema, model, Document, Types } from "mongoose";
const leadSchema = new Schema({
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
}, {
    timestamps: true,
});
const Lead = model("Lead", leadSchema);
export default Lead;
//# sourceMappingURL=lead.model.js.map