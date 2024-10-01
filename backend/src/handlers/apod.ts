import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { getApodService } from "../services/service-injection";
import { ApodQueryParam } from "../@types/page";

const apodHandler = (apodService = getApodService()) => {
  const getToday = async (req: Request, res: Response, next: NextFunction) => {
    return apodService
      .getTodayApi()
      .then((result) => {
        return res.status(StatusCodes.OK).json(result);
      })
      .catch(function (error) {
        return next(error);
      });
  };

  const getSingle = async (
    req: Request<{}, {}, {}, ApodQueryParam>,
    res: Response,
    next: NextFunction
  ) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ errors: result.array() });
    }

    const { date } = req.query;

    if (!date) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ errors: { message: "Wrong date format" } });
    }

    return apodService
      .getSingleApi(date)
      .then((result) => {
        return res.status(StatusCodes.OK).json(result);
      })
      .catch(function (error) {
        return next(error);
      });
  };

  const getDateRamge = async (
    req: Request<{}, {}, {}, ApodQueryParam>,
    res: Response,
    next: NextFunction
  ) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ errors: result.array() });
    }

    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ errors: { message: "Wrong date format" } });
    }

    return apodService
      .getDateRangeApi(startDate, endDate)
      .then((result) => {
        return res.status(StatusCodes.OK).json(result);
      })
      .catch(function (error) {
        return next(error);
      });
  };

  return { getToday, getSingle, getDateRamge };
};

export default apodHandler;
