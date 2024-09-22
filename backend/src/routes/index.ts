import express from "express";
import ApodService from "../services/ApodService";
import apodRoute from "./apod";
import ImageLibService from "../services/ImageLibService";
import imageLibRoute from "./imagelib";

export type RouteProps = {
  apodService: ApodService;
  imageLibService: ImageLibService;
};

const routerModule = (params: RouteProps) => {
  const router = express.Router();

  router.use("/api/apod", apodRoute(params));
  router.use("/api/image-lib", imageLibRoute(params));

  return router;
};

export default routerModule;
