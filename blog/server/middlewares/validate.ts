import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body); // Validate the request body
      next(); // Call the next middleware/handler if validation passes
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        res.status(400).json({
          message: "Validation failed",
          errors: error.errors, // ZodError contains validation error details
        });
      } else {
        // Handle unexpected errors
        res.status(500).json({
          message: "An unexpected error occurred",
        });
      }
    }
  };
