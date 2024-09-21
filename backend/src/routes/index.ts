import express from "express";
import ApodService from "../services/ApodService";
import apodRoute from "./apod";

export type RouteProps = {
  apodService: ApodService;
};

const routerModule = (params: RouteProps) => {
  const router = express.Router();

  router.use("/api/apod", apodRoute(params));

  return router;
};

export default routerModule;
