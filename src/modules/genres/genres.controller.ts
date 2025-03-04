import { Router, type Request, type Response } from "express";
import genresService from "./genres.service";

export default () => {
  const router = Router();
  const service = genresService();

  router.get("/", findMany);

  async function findMany(req: Request, res: Response) {
    try {
      const genres = await service.findMany();

      res.json(genres);
    } catch (error) {
      console.error(`Error while getting genres:`, error);

      res.status(500).send();
    }
  }

  return {
    path: "/genres",
    router,
  };
};
