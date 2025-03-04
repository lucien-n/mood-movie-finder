import { TMDBService } from "@/services/tmdb.service";
import { WeatherService } from "@/services/weather.service";
import { handleValidate } from "@/validate";
import { Router, type Request, type Response } from "express";
import { param } from "express-validator";
import { RecommendService } from "@/services/recommend.service";

export class RecommendController {
  public router = Router();
  private service = new RecommendService(
    new TMDBService(),
    new WeatherService()
  );

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `/recommend/:city`,
      param("city")
        .notEmpty()
        .escape()
        .isLength({ min: 2, max: 32 })
        .withMessage("Must be a string of length >= 2 & <= 32"),
      handleValidate,
      this.findManyByCity.bind(this)
    );
  }

  async findManyByCity(req: Request<{ city: string }>, res: Response) {
    const city = req.params.city;

    try {
      const data = await this.service.findManyByCity(city);

      res.json(data);
    } catch (error) {
      console.error(`Error while getting movies by city "${city}":`, error);

      res.status(500).send();
    }
  }
}
