import { Router } from "express";
import imageLibHandler from "../handlers/image-lib";
import { getImageLibService } from "../services/service-injection";

const router = Router();

const imageLibRoute = (imageLibService = getImageLibService()) => {
  const { search, asset } = imageLibHandler(imageLibService);

  router.get("/", search);
  router.get("/asset/:nasaid", asset);

  return router;
};

export default imageLibRoute;
