"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("../config/"));
/**
 * Create winston logger for logging
 */
const { combine, timestamp, printf, json } = winston_1.default.format;
const logger = () => {
    return winston_1.default.createLogger({
        // Log only if level is less than (meaning more severe) or equal to this
        level: config_1.default.logger.level,
        // Use timestamp and printf to create a standard log format
        format: combine(timestamp(), json()
        // printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        // Log to the console and a file
        transports: [
            new winston_1.default.transports.Console(),
            new winston_1.default.transports.File({
                filename: "logs/app.log",
                level: config_1.default.logger.level,
            }),
        ],
        defaultMeta: true,
    });
};
exports.default = logger();
