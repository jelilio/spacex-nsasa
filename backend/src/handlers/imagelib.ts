import { NextFunction, Request, Response } from "express";
import { RouteProps } from "../routes";
import { ImageSearchParam, Paged } from "../@types/page";
import { StatusCodes } from "http-status-codes";
import { AxiosError } from "axios";
import BadRequestError from "../errors/BadRequestError";
import { ImageItem } from "../services/ImageLibService";

export type ImageLibObject = {
  search: (
    req: Request<{}, {}, {}, ImageSearchParam>,
    res: Response,
    next: NextFunction
  ) => void;
};

const FIRST_PAGE = 1;
const PAGE_STEP = 1;

const imageLibHandler = ({ imageLibService }: RouteProps): ImageLibObject => {
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
      .search({ q, page, size, mediaType })
      .then((result) => {
        const pageNumber = Number(page);
        const sizeNumber = Number(size);

        const data = result.data;
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
      .catch(function (error: AxiosError<{ reason: string }>) {
        return next(
          new BadRequestError({
            code: error.response?.status || StatusCodes.BAD_REQUEST,
            logging: false,
            context: error.response?.data,
          })
        );
      });
  };

  return { search };
};

export default imageLibHandler;
