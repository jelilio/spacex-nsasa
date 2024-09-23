import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import logger from "../lib/logger";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const DEFAULT_IDENTATION = 2;

// error handler middleware
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Handled errors
  if (err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    if (logging) {
      logger.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          DEFAULT_IDENTATION
        )
      );
    }

    return res.status(statusCode).send({ errors });
  }

  // Unhandled errors
  logger.error(JSON.stringify(err, null, DEFAULT_IDENTATION));
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }] });
};
