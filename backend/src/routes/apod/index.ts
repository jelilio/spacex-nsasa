import { Router, Request, Response } from "express";
import { RouteProps } from "..";

const router = Router();

const apodRoute = ({ apodService }: RouteProps) => {
  router.get("/", async (req: Request, res: Response) => {
    const result = await apodService.fetchApod({ date: new Date() });

    return res.status(200).json(result);
  });

  return router;
};

export default apodRoute;
