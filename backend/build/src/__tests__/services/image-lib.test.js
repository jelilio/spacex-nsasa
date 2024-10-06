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
Object.defineProperty(exports, "__esModule", { value: true });
const service_injection_1 = require("../../services/service-injection");
describe("getSearchApi", () => {
    it("should return a value", () => __awaiter(void 0, void 0, void 0, function* () {
        let imageLibService = (0, service_injection_1.getImageLibService)();
        let res = yield imageLibService.getSearchApi({
            q: "apollo",
            size: 1,
            page: 1,
        });
        expect(res).toBeTruthy();
    }));
});
describe("getAssetApi", () => {
    it("should return a value", () => __awaiter(void 0, void 0, void 0, function* () {
        let imageLibService = (0, service_injection_1.getImageLibService)();
        let res = yield imageLibService.getAssetApi("123456");
        expect(res).toBeTruthy();
    }));
});
