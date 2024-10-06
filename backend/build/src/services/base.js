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
const axios_1 = __importDefault(require("axios"));
const http_status_codes_1 = require("http-status-codes");
const BadRequestError_1 = __importDefault(require("../errors/BadRequestError"));
class BaseService {
    constructor({ baseUrl, apiKey, endpoints }) {
        this.baseUrl = apiKey
            ? `${baseUrl}${endpoints}?api_key=${apiKey}`
            : `${baseUrl}${endpoints}`;
    }
    fetchData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const result = yield axios_1.default.get(url.toString());
                return result.data;
            }
            catch (err) {
                const error = err;
                if (axios_1.default.isAxiosError(error)) {
                    throw new BadRequestError_1.default({
                        code: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || http_status_codes_1.StatusCodes.BAD_REQUEST,
                        context: (_b = error.response) === null || _b === void 0 ? void 0 : _b.data,
                        logging: true,
                    });
                }
                else {
                    throw new Error("Ops! An error occured");
                }
            }
        });
    }
}
exports.default = BaseService;
