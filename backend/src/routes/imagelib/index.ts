import { Router } from "express";
import { RouteProps } from "..";
import imageLibCtrl from "../../controllers/imagelib";

const router = Router();

const imageLibRoute = (params: RouteProps) => {
  const { search } = imageLibCtrl(params);

  router.get("/", search);

  return router;
};

export default imageLibRoute;
