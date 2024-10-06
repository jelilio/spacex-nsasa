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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const service_injection_1 = require("../../services/service-injection");
describe("getTodayApi", () => {
    it("should return a value", () => __awaiter(void 0, void 0, void 0, function* () {
        let apodService = (0, service_injection_1.getApodService)();
        let res = yield apodService.getTodayApi();
        expect(res.copyright).toEqual("copyright0");
    }));
});
describe("getSingleApi", () => {
    it("should return a value", () => __awaiter(void 0, void 0, void 0, function* () {
        let apodService = (0, service_injection_1.getApodService)();
        let todaysDate = new Date();
        let today = (0, moment_1.default)(todaysDate).format("YYYY-MM-DD");
        let res = yield apodService.getSingleApi(todaysDate);
        expect(res.date).toEqual(today);
    }));
});
