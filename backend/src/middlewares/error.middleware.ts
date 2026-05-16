import type{ Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

export default errorMiddleware;