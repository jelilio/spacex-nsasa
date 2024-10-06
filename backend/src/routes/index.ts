import express, { Request, Response, NextFunction } from "express";
import imageLibRoute from "./image-lib";
import apodRoute from "./apod";

const routerModule = () => {
  const router = express.Router();

  router.get("/", function (req: Request, res: Response): void {
    res.send("<h1>App Running</h1>");
  });

  router.use("/api/apod", apodRoute());
  router.use("/api/imagelib", imageLibRoute());

  return router;
};

export default routerModule;
