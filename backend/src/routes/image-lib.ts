import { Router } from "express";
import imageLibHandler from "../handlers/image-lib";

const router = Router();

const imageLibRoute = () => {
  const { search, asset } = imageLibHandler();

  router.get("/", search);
  router.get("/asset/:nasaid", asset);

  return router;
};

export default imageLibRoute;
