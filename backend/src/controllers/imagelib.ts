import { NextFunction, Request, Response } from "express";
import { RouteProps } from "../routes";
import { ImageSearchParam } from "../@types/page";
import { StatusCodes } from "http-status-codes";
import { AxiosError } from "axios";
import BadRequestError from "../errors/BadRequestError";

export type ImageLibObject = {
  search: (
    req: Request<{}, {}, {}, ImageSearchParam>,
    res: Response,
    next: NextFunction
  ) => void;
};

const imageLibCtrl = ({ imageLibService }: RouteProps): ImageLibObject => {
  const search = async (
    req: Request<{}, {}, {}, ImageSearchParam>,
    res: Response,
    next: NextFunction
  ) => {
    const { q, page, size, mediaType } = req.query;

    return imageLibService
      .search({ q, page, size, mediaType })
      .then((result) => {
        return res.status(StatusCodes.OK).json(result.data);
      })
      .catch(function (error: AxiosError) {
        return next(
          new BadRequestError({
            code: error.response?.status || StatusCodes.BAD_REQUEST,
            logging: false,
          })
        );
      });
  };

  return { search };
};

export default imageLibCtrl;
