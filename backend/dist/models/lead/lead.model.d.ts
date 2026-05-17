import { Document, Types } from "mongoose";
export interface ILead extends Document {
    name: string;
    email: string;
    status: "new" | "contacted" | "qualified" | "lost";
    source: "website" | "instagram" | "referral";
    createdBy: Types.ObjectId;
}
declare const Lead: import("mongoose").Model<ILead, {}, {}, {}, Document<unknown, {}, ILead, {}, import("mongoose").DefaultSchemaOptions> & ILead & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILead>;
export default Lead;
//# sourceMappingURL=lead.model.d.ts.map