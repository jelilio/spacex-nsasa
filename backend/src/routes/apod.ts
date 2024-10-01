import { Router } from "express";
import { query } from "express-validator";
import apodHandler from "../handlers/apod";
import { getApodService } from "../services/service-injection";

const router = Router();

const apodRouter = (apodService = getApodService()) => {
  const { getToday, getSingle, getDateRamge } = apodHandler(apodService);

  router.get("/today", getToday);
  router.get(
    "/single",
    query("date")
      .notEmpty()
      .withMessage("date is required")
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("Not a valid date format"),
    getSingle
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
    getDateRamge
  );

  return router;
};

export default apodRouter;
