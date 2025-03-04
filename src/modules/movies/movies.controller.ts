import { Router, type Request, type Response } from "express";
import moviesService from "./movies.service";

export default () => {
  const router = Router();
  const service = moviesService();

  router.get("/:name", findAllByName);

  async function findAllByName(req: Request, res: Response) {
    const name = req.params.name;

    try {
      const movie = await service.findAllByName(name);

      res.json(movie);
    } catch (error) {
      console.error(`Error while getting movie by name "${name}":`, error);

      res.status(500).send();
    }
  }

  return {
    path: "/movies",
    router,
  };
};
