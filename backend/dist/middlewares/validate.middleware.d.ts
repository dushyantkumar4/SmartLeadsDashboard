import type { Request, Response, NextFunction } from "express";
import type { ObjectSchema } from "joi";
declare const validate: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => void;
export default validate;
//# sourceMappingURL=validate.middleware.d.ts.map