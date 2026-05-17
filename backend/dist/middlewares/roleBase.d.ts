import type { Request, Response, NextFunction } from "express";
declare const checkRole: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default checkRole;
//# sourceMappingURL=roleBase.d.ts.map