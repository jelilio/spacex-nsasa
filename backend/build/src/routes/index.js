"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_lib_1 = __importDefault(require("./image-lib"));
const apod_1 = __importDefault(require("./apod"));
const routerModule = () => {
    const router = express_1.default.Router();
    router.get("/", function (req, res) {
        res.send("<h1>App Running</h1>");
    });
    router.use("/api/apod", (0, apod_1.default)());
    router.use("/api/imagelib", (0, image_lib_1.default)());
    return router;
};
exports.default = routerModule;
