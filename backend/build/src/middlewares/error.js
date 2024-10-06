"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const BaseError_1 = __importDefault(require("../errors/BaseError"));
const logger_1 = __importDefault(require("../lib/logger"));
const http_status_codes_1 = require("http-status-codes");
const DEFAULT_IDENTATION = 2;
// error handler middleware
const errorHandler = (err, _req, res, _next) => {
    // Handled errors
    if (err instanceof BaseError_1.default) {
        const { statusCode, errors, logging } = err;
        if (logging) {
            logger_1.default.error(JSON.stringify({
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack,
            }, null, DEFAULT_IDENTATION));
        }
        return res.status(statusCode).send({ errors });
    }
    // Unhandled errors
    logger_1.default.error(JSON.stringify(err, null, DEFAULT_IDENTATION));
    return res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ errors: [{ message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR }] });
};
exports.errorHandler = errorHandler;
