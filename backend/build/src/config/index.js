"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        name: `${process.env.APP_NAME} [Devlopment]`,
        logger: {
            level: "info",
        },
        nasa: {
            apiKey: process.env.DEV_NASA_API_KEY,
            apiBaseUrl: process.env.DEV_NASA_API_URL,
            apiImageBaseUrl: process.env.DEV_NASA_IMAGES_API_URL,
        },
    },
    test: {
        name: `${process.env.APP_NAME} [Devlopment]`,
        logger: {
            level: "info",
        },
        nasa: {
            apiKey: process.env.DEV_NASA_API_KEY,
            apiBaseUrl: process.env.DEV_NASA_API_URL,
            apiImageBaseUrl: process.env.DEV_NASA_IMAGES_API_URL,
        },
    },
    production: {
        name: `${process.env.APP_NAME}`,
        logger: {
            level: "error",
        },
        nasa: {
            apiKey: process.env.PROD_NASA_API_KEY,
            apiBaseUrl: process.env.PROD_NASA_API_URL,
            apiImageBaseUrl: process.env.PROD_NASA_IMAGES_API_URL,
        },
    },
};
const environment = process.env.NODE_ENV;
exports.default = config[environment || "development"];
