import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Log unexpected errors
  console.error(err);

  // Handle general errors (catch-all)
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong. Please try again later.',
  });
};