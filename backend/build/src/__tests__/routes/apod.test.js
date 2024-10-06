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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    server = app_1.default;
}));
describe("getTodayRoute", () => {
    it("should return a value", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server)
            .get(`/api/apod/today`)
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res.body.copyright).toBe("copyright0");
    }));
});
describe("getSingleRoute", () => {
    it("should return a value", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server)
            .get(`/api/apod/single?date=2023-12-12`)
            .expect("Content-Type", /json/)
            .expect(200);
        expect(res.body.date).toBe("2023-12-12");
    }));
});
describe("getDateRange", () => {
    it("should return an error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server)
            .get(`/api/apod/date-range`)
            .expect("Content-Type", /json/)
            .expect(400);
        // startDate and endDate are missing
        expect(res.body.errors).toHaveLength(4);
    }));
});
