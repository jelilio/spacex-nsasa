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
exports.FakeImageLibServiceImpl = void 0;
const config_1 = __importDefault(require("../config"));
const base_1 = __importDefault(require("./base"));
const apod_1 = require("../../data/apod");
const ENDPOINT = "";
class ImageLibServiceImpl extends base_1.default {
    constructor() {
        super({
            baseUrl: config_1.default.nasa.apiImageBaseUrl,
            endpoints: ENDPOINT,
        });
    }
    getSearchApi(_a) {
        return __awaiter(this, arguments, void 0, function* ({ q, page, size, mediaType, }) {
            var url = new URL(`${this.baseUrl}/search`);
            q && url.searchParams.append("q", q);
            size && url.searchParams.append("page_size", size.toString());
            page && url.searchParams.append("page", page.toString());
            mediaType && url.searchParams.append("media_type", mediaType);
            return yield this.fetchData(url);
        });
    }
    getAssetApi(nasaId) {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new URL(`${this.baseUrl}/asset/`);
            url.pathname = nasaId && url.pathname.concat(nasaId);
            return yield this.fetchData(url);
        });
    }
}
class FakeImageLibServiceImpl {
    getSearchApi(_a) {
        return __awaiter(this, arguments, void 0, function* ({ q, page, size, mediaType, }) {
            return new Promise(function (resolve, reject) {
                return resolve(apod_1.imageLib);
            });
        });
    }
    getAssetApi(nasaId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return resolve(apod_1.imageLib);
            });
        });
    }
}
exports.FakeImageLibServiceImpl = FakeImageLibServiceImpl;
exports.default = ImageLibServiceImpl;
