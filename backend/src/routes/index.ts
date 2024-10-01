import express from "express";
import imageLibRoute from "./image-lib";
import apodRoute from "./apod";

const routerModule = () => {
  const router = express.Router();

  router.use("/api/apod", apodRoute());
  router.use("/api/imagelib", imageLibRoute());

  return router;
};

export default routerModule;
