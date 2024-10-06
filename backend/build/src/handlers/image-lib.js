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
const http_status_codes_1 = require("http-status-codes");
const service_injection_1 = require("../services/service-injection");
const FIRST_PAGE = 1;
const PAGE_STEP = 1;
const imageLibHandler = (imageLibService = (0, service_injection_1.getImageLibService)()) => {
    const search = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { q, page, size, mediaType } = req.query;
        if (!q && !mediaType) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ errors: { message: "Either q or mediaType is required" } });
        }
        return imageLibService
            .getSearchApi({ q, page, size, mediaType })
            .then((result) => {
            const pageNumber = Number(page);
            const sizeNumber = Number(size);
            const data = result;
            const content = data.collection.items;
            const numberOfElements = data.collection.items.length;
            const totalElements = data.collection.metadata.total_hits;
            const totalPages = Math.ceil(totalElements / sizeNumber);
            const paged = {
                content,
                meta: {
                    size: sizeNumber,
                    page: pageNumber,
                    numberOfElements,
                    totalElements,
                    totalPages,
                },
                nextPage: pageNumber < totalPages ? pageNumber + PAGE_STEP : undefined,
                previousPage: pageNumber > FIRST_PAGE ? pageNumber - PAGE_STEP : undefined,
            };
            return res.status(http_status_codes_1.StatusCodes.OK).json(paged);
        })
            .catch(function (error) {
            return next(error);
        });
    });
    const asset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { nasaid } = req.params;
        if (!nasaid) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ errors: { message: "nasaid is required" } });
        }
        return imageLibService
            .getAssetApi(nasaid)
            .then((result) => {
            return res.status(http_status_codes_1.StatusCodes.OK).json(result.collection);
        })
            .catch(function (error) {
            return next(error);
        });
    });
    return { search, asset };
};
exports.default = imageLibHandler;
