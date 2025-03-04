import { Router, type Request, type Response } from "express";
import { TmdbService } from "./tmdb.service";

export class TMDBController {
  public router = Router();
  private service = new TmdbService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/search/:name`, this.findManyByName);
    this.router.get(`/genre/:genre`, this.findManyByGenre);
    this.router.get(`/recommend/:city`, this.findManyByWeather);
  }

  private async findManyByName(req: Request, res: Response) {
    const name = req.params.name;

    try {
      const movies = await this.service.findManyByName(name);
      res.json(movies);
    } catch (error) {
      console.error(`Error while getting movies by name "${name}":`, error);
      res.status(500).send();
    }
  }

  private async findManyByGenre(req: Request, res: Response) {
    const genre = req.params.genre;

    try {
      const movies = await this.service.findManyByGenre(genre);
      res.json(movies);
    } catch (error) {
      console.error(`Error while getting movies by genre "${genre}":`, error);
      res.status(500).send();
    }
  }

  private async findManyByWeather(req: Request, res: Response) {
    res.status(200).send();
  }
}
