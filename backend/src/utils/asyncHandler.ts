import type {
  Request,
  Response,
  NextFunction,
} from "express";

const asyncHandler = <
  T extends Request = Request
>(
  fn: (
    req: T,
    res: Response,
    next: NextFunction,
  ) => Promise<void>,
) => {
  return (
    req: T,
    res: Response,
    next: NextFunction,
  ): void => {
    Promise.resolve(
      fn(req, res, next),
    ).catch(next);
  };
};

export default asyncHandler;