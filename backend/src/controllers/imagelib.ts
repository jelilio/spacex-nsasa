import { Request, Response } from "express";
import { RouteProps } from "../routes";
import { ImageSearchParam } from "../@types/page";

export type ImageLibObject = {
  search: (
    req: Request<{}, {}, {}, ImageSearchParam>,
    res: Response
  ) => Promise<Response<any, Record<string, any>>>;
};

const imageLibCtrl = ({ imageLibService }: RouteProps): ImageLibObject => {
  const search = async (
    req: Request<{}, {}, {}, ImageSearchParam>,
    res: Response
  ) => {
    const { q, page, size, mediaType } = req.query;

    const result = await imageLibService.search({ q, page, size, mediaType });

    return res.status(200).json(result);
  };

  return { search };
};

export default imageLibCtrl;
