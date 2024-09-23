import express from "express";
import ApodService from "../services/ApodService";
import apodRoute from "./apods";
import ImageLibService from "../services/ImageLibService";
import imageLibRoute from "./imagelib";

export type RouteProps = {
  apodService: ApodService;
  imageLibService: ImageLibService;
};

const routerModule = (params: RouteProps) => {
  const router = express.Router();

  router.use("/api/apod", apodRoute(params));
  router.use("/api/imagelib", imageLibRoute(params));

  return router;
};

export default routerModule;
