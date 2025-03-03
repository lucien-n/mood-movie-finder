import { Router, type Request, type Response } from "express";
import weatherService from "./weather.service";

export default () => {
  const router = Router();
  const service = weatherService();

  router.get("/:city", findOne);

  async function findOne(req: Request, res: Response) {
    const city = req.params.city;

    try {
      const data = await service.findOneByCity(city);

      res.json(data);
    } catch (error) {
      console.error(`Error while getting weather by city "${city}":`, error);

      res.status(500).send();
    }
  }

  return {
    path: "/weather",
    router,
  };
};
