import { Router } from "express";
import { RouteProps } from ".";
import imageLibHandler from "../handlers/imagelib";

const router = Router();

const imageLibRoute = (params: RouteProps) => {
  const { search, asset } = imageLibHandler(params);

  router.get("/", search);
  router.get("/asset/:nasaid", asset);

  return router;
};

export default imageLibRoute;
