import type { Request, Response, NextFunction } from "express";
declare const asyncHandler: <T extends Request = Request>(fn: (req: T, res: Response, next: NextFunction) => Promise<void>) => (req: T, res: Response, next: NextFunction) => void;
export default asyncHandler;
//# sourceMappingURL=asyncHandler.d.ts.map