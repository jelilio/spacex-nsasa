import { Router } from "express";
import { RouteProps } from ".";
import imageLibHandler from "../handlers/imagelib";

const router = Router();

const imageLibRoute = (params: RouteProps) => {
  const { search } = imageLibHandler(params);

  router.get("/", search);

  return router;
};

export default imageLibRoute;
