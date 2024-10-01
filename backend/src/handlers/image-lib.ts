import { NextFunction, Request, Response } from "express";
import { ImageSearchParam, Paged } from "../@types/page";
import { StatusCodes } from "http-status-codes";
import { getImageLibService } from "../services/service-injection";
import { ImageItem } from "../services/image-lib";

const FIRST_PAGE = 1;
const PAGE_STEP = 1;

const imageLibHandler = (imageLibService = getImageLibService()) => {
  const search = async (
    req: Request<{}, {}, {}, ImageSearchParam>,
    res: Response,
    next: NextFunction
  ) => {
    const { q, page, size, mediaType } = req.query;

    if (!q && !mediaType) {
      return res
        .status(StatusCodes.BAD_REQUEST)
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

        const paged: Paged<ImageItem> = {
          content,
          meta: {
            size: sizeNumber,
            page: pageNumber,
            numberOfElements,
            totalElements,
            totalPages,
          },
          nextPage:
            pageNumber < totalPages ? pageNumber + PAGE_STEP : undefined,
          previousPage:
            pageNumber > FIRST_PAGE ? pageNumber - PAGE_STEP : undefined,
        };

        return res.status(StatusCodes.OK).json(paged);
      })
      .catch(function (error) {
        return next(error);
      });
  };

  const asset = async (
    req: Request<{ nasaid: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { nasaid } = req.params;

    if (!nasaid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ errors: { message: "nasaid is required" } });
    }

    return imageLibService
      .getAssetApi(nasaid)
      .then((result) => {
        return res.status(StatusCodes.OK).json(result.collection);
      })
      .catch(function (error) {
        return next(error);
      });
  };

  return { search, asset };
};

export default imageLibHandler;
