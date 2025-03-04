import { Router, type Request, type Response } from "express";
import { TMDBService } from "./tmdb.service";

export class TMDBController {
  public router = Router();
  private service = new TMDBService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/search/:name`, this.findManyByName.bind(this));
    this.router.get(`/genre/:genre`, this.findManyByGenre.bind(this));
    this.router.get(`/genres`, this.findManyGenre.bind(this));
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

  private async findManyGenre(req: Request, res: Response) {
    try {
      const genres = await this.service.findManyGenre();

      res.json(genres);
    } catch (error) {
      console.error(`Error while getting genres:`, error);

      res.status(500).send();
    }
  }
}
