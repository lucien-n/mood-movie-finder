import { RecommendService } from "@/services/recommend.service";
import { TMDBService } from "@/services/tmdb.service";
import { WeatherService } from "@/services/weather.service";
import { handleValidate } from "@/validate";
import axios from "axios";
import { Router, type Request, type Response } from "express";
import { param } from "express-validator";

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
      if (axios.isAxiosError(error) && error.status) {
        res.status(error.status).send();
        return;
      }

      res.status(500).send();
    }
  }
}
