"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const apod_1 = __importDefault(require("../handlers/apod"));
const service_injection_1 = require("../services/service-injection");
const router = (0, express_1.Router)();
const apodRouter = (apodService = (0, service_injection_1.getApodService)()) => {
    const { getToday, getSingle, getDateRamge } = (0, apod_1.default)(apodService);
    router.get("/today", getToday);
    router.get("/single", (0, express_validator_1.query)("date")
        .notEmpty()
        .withMessage("date is required")
        .isDate({ format: "YYYY-MM-DD" })
        .withMessage("Not a valid date format"), getSingle);
    router.get("/date-range", (0, express_validator_1.query)("startDate")
        .notEmpty()
        .withMessage("startDate is required")
        .isDate({ format: "YYYY-MM-DD" })
        .withMessage("Not a valid date format"), (0, express_validator_1.query)("endDate")
        .notEmpty()
        .withMessage("endDate is required")
        .isDate({ format: "YYYY-MM-DD" })
        .withMessage("Not a valid date format"), getDateRamge);
    return router;
};
exports.default = apodRouter;
