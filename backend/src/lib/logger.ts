import winston from "winston";
import config from "../config/";

/**
 * Create winston logger for logging
 */
const { combine, timestamp, printf, json } = winston.format;

const logger = () => {
  return winston.createLogger({
    // Log only if level is less than (meaning more severe) or equal to this
    level: config.logger.level,
    // Use timestamp and printf to create a standard log format
    format: combine(
      timestamp(),
      json()
      // printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    // Log to the console and a file
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "logs/app.log" }),
    ],
    defaultMeta: true,
  });
};

export default logger();
