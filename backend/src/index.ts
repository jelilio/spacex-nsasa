import express, { Application, Router, Request, Response } from "express";
import config from "./config";

const app: Application = express();
var router: Router = Router();
const port = process.env.PORT || "3000";

app.use(router);

router.get("/", function (req: Request, res: Response): void {
  res.send("<h1>App Running</h1>");
});

app.listen(port, () => {
  console.log(`Server Running here 👉 http://localhost:${port}`);
});
