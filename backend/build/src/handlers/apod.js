"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const service_injection_1 = require("../services/service-injection");
const apodHandler = (apodService = (0, service_injection_1.getApodService)()) => {
    const getToday = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        return apodService
            .getTodayApi()
            .then((result) => {
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        })
            .catch(function (error) {
            return next(error);
        });
    });
    const getSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ errors: result.array() });
        }
        const { date } = req.query;
        if (!date) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ errors: { message: "Wrong date format" } });
        }
        return apodService
            .getSingleApi(date)
            .then((result) => {
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        })
            .catch(function (error) {
            return next(error);
        });
    });
    const getDateRamge = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ errors: result.array() });
        }
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ errors: { message: "Wrong date format" } });
        }
        return apodService
            .getDateRangeApi(startDate, endDate)
            .then((result) => {
            return res.status(http_status_codes_1.StatusCodes.OK).json(result);
        })
            .catch(function (error) {
            return next(error);
        });
    });
    return { getToday, getSingle, getDateRamge };
};
exports.default = apodHandler;
