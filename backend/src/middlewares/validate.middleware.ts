import type{ Request, Response, NextFunction } from "express";
import type{ ObjectSchema } from "joi";

const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        success: false,
        message: error.details?.[0]?.message ?? "Validation failed",
      });

      return;
    }

    next();
  };

export default validate;