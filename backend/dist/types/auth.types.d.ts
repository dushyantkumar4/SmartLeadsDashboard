import type { JwtPayload } from "jsonwebtoken";
export interface CustomJwtPayload extends JwtPayload {
    id: string;
    role: "admin" | "sales";
}
declare global {
    namespace Express {
        interface Request {
            user?: CustomJwtPayload;
        }
    }
}
export {};
//# sourceMappingURL=auth.types.d.ts.map