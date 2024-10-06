"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_lib_1 = __importDefault(require("../handlers/image-lib"));
const service_injection_1 = require("../services/service-injection");
const router = (0, express_1.Router)();
const imageLibRoute = (imageLibService = (0, service_injection_1.getImageLibService)()) => {
    const { search, asset } = (0, image_lib_1.default)(imageLibService);
    router.get("/", search);
    router.get("/asset/:nasaid", asset);
    return router;
};
exports.default = imageLibRoute;
