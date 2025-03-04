import { Router, type Request, type Response } from "express";
import moviesService from "./movies.service";

export default () => {
  const router = Router();
  const service = moviesService();

  router.get("/name/:name", findManyByName);
  router.get("/genre/:genre", findManyByGenre);

  async function findManyByName(req: Request, res: Response) {
    const name = req.params.name;

    try {
      const movies = await service.findManyByName(name);

      res.json(movies);
    } catch (error) {
      console.error(`Error while getting movies by name "${name}":`, error);

      res.status(500).send();
    }
  }

  async function findManyByGenre(req: Request, res: Response) {
    const genre = req.params.genre;

    try {
      const movies = await service.findManyByGenre(genre);

      res.json(movies);
    } catch (error) {
      console.error(`Error while getting movies by genre "${genre}":`, error);

      res.status(500).send();
    }
  }

  return {
    path: "/movies",
    router,
  };
};
