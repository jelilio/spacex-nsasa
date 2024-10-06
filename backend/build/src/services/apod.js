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
exports.FakeApodServiceImpl = void 0;
const config_1 = __importDefault(require("../config"));
const moment_1 = __importDefault(require("moment"));
const base_1 = __importDefault(require("./base"));
const apod_1 = require("../../data/apod");
const ENDPOINT = "/planetary/apod";
class ApodServiceImpl extends base_1.default {
    constructor() {
        super({
            baseUrl: config_1.default.nasa.apiBaseUrl,
            endpoints: ENDPOINT,
            apiKey: config_1.default.nasa.apiKey,
        });
    }
    getTodayApi() {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new URL(this.baseUrl);
            return this.fetchData(url);
        });
    }
    getSingleApi(date) {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new URL(this.baseUrl);
            date && url.searchParams.append("date", (0, moment_1.default)(date).format("YYYY-MM-DD"));
            return this.fetchData(url);
        });
    }
    getDateRangeApi(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new URL(this.baseUrl);
            startDate &&
                url.searchParams.append("start_date", (0, moment_1.default)(startDate).format("YYYY-MM-DD"));
            endDate &&
                url.searchParams.append("end_date", (0, moment_1.default)(endDate).format("YYYY-MM-DD"));
            return this.fetchData(url);
        });
    }
    getRandomApi(count, thumbs) {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new URL(this.baseUrl);
            count && url.searchParams.append("count", count.toString());
            thumbs && url.searchParams.append("thumbs", thumbs.toString());
            return this.fetchData(url);
        });
    }
}
class FakeApodServiceImpl {
    getTodayApi() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return resolve(apod_1.apod_list[0]);
            });
        });
    }
    getSingleApi(date) {
        return __awaiter(this, void 0, void 0, function* () {
            let today = date && (0, moment_1.default)(date).format("YYYY-MM-DD");
            let data = apod_1.apod_list[0];
            data.date = today;
            return new Promise(function (resolve, reject) {
                return resolve(data);
            });
        });
    }
    getDateRangeApi(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return resolve(apod_1.apod_list);
            });
        });
    }
    getRandomApi(count, thumbs) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return resolve(apod_1.apod_list[0]);
            });
        });
    }
}
exports.FakeApodServiceImpl = FakeApodServiceImpl;
exports.default = ApodServiceImpl;
