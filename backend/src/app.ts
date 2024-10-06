import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ConfigObject } from "./config";
import { errorHandler } from "./middlewares/error";
import routes from "./routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

if (app.get("env") === "development") {
  app.locals.pretty = true;
}

app.use("/", routes());

app.use(errorHandler); // for error handling

export default app;
