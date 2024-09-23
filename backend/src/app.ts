import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ConfigObject } from "./config";
import { errorHandler } from "./middlewares/error";
import ApodService from "./services/ApodService";
import routes from "./routes";
import ImageLibService from "./services/ImageLibService";

const appModule = (config: ConfigObject): Application => {
  const app: Application = express();

  const apodService = new ApodService(config);
  const imageLibService = new ImageLibService(config);

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.urlencoded({ extended: true }));

  if (app.get("env") === "development") {
    app.locals.pretty = true;
  }

  app.use("/", routes({ apodService, imageLibService }));

  app.use(errorHandler); // for error handling

  return app;
};

export default appModule;
