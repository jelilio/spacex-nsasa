import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RouteProps } from "../routes";
import { ApodQueryParam } from "../@types/page";
import { AxiosError } from "axios";
import BadRequestError from "../errors/BadRequestError";
import { ApodError } from "../services/ApodService";

export type ImageLibObject = {
  today: (req: Request, res: Response, next: NextFunction) => void;
  single: (
    req: Request<{}, {}, {}, ApodQueryParam>,
    res: Response,
    next: NextFunction
  ) => void;
  dateRange: (
    req: Request<{}, {}, {}, ApodQueryParam>,
    res: Response,
    next: NextFunction
  ) => void;
};

const apodCtrl = ({ apodService }: RouteProps) => {
  const single = async (
    req: Request<{}, {}, {}, ApodQueryParam>,
    res: Response,
    next: NextFunction
  ) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const { date } = req.query;

    return apodService
      .single({ date })
      .then((result) => {
        return res.status(200).json(result.data);
      })
      .catch(function (error: AxiosError<ApodError>) {
        return next(
          new BadRequestError({
            code: +(error.response?.data?.code || 400),
            context: error.response?.data,
            logging: false,
          })
        );
      });
  };

  const today = async (req: Request, res: Response, next: NextFunction) => {
    return apodService
      .today()
      .then((result) => {
        return res.status(200).json(result.data);
      })
      .catch(function (error: AxiosError<ApodError>) {
        return next(
          new BadRequestError({
            code: +(error.response?.data?.code || 400),
            context: error.response?.data,
            logging: false,
          })
        );
      });
  };

  const dateRange = async (
    req: Request<{}, {}, {}, ApodQueryParam>,
    res: Response,
    next: NextFunction
  ) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const { startDate, endDate } = req.query;

    return apodService
      .dateRange({ startDate, endDate })
      .then((result) => {
        return res.status(200).json(result.data);
      })
      .catch(function (error: AxiosError<ApodError>) {
        return next(
          new BadRequestError({
            code: +(error.response?.data?.code || 400),
            context: error.response?.data,
            logging: false,
          })
        );
      });
  };

  return { single, today, dateRange };
};

export default apodCtrl;
