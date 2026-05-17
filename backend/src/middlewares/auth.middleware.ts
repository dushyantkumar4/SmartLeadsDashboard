import type {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { CustomJwtPayload } from "../types/auth.types.js";

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const splitToken = token.split(" ")[1];

    if (!splitToken) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const decoded = jwt.verify(
      splitToken,
      process.env.JWT_SECRET as string,
    ) as unknown as CustomJwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
