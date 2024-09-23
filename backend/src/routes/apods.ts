import { Router, Request, Response } from "express";
import { RouteProps } from ".";
import apodHandler from "../handlers/apod";
import { query } from "express-validator";

const router = Router();

const apodRoute = (params: RouteProps) => {
  const { single, today, dateRange } = apodHandler(params);

  router.get("/", today);
  router.get(
    "/single",
    query("date")
      .notEmpty()
      .withMessage("date is required")
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("Not a valid date format"),
    single
  );
  router.get(
    "/date-range",
    query("startDate")
      .notEmpty()
      .withMessage("startDate is required")
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("Not a valid date format"),
    query("endDate")
      .notEmpty()
      .withMessage("endDate is required")
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("Not a valid date format"),
    dateRange
  );

  return router;
};

export default apodRoute;
