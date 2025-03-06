import { RecommendService } from "@/services/recommend.service";
import { TMDBService } from "@/services/tmdb.service";
import { WeatherService } from "@/services/weather.service";
import { validate } from "@/validate";
import axios from "axios";
import { NextFunction, Router, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import cityParamValidator from "./validators/city.param";
import { ApiError } from "common";

export class RecommendController {
  public router = Router();
  private service = new RecommendService(
    new TMDBService(),
    new WeatherService()
  );
  private limiter = rateLimit({
    windowMs: 5 * 1000, // 5 seconds
    limit: 4,
    message: ApiError.RateLimit,
  });

  constructor() {
    this.router.use(this.limiter);

    this.router.get(
      `/recommend/:city`,
      validate(cityParamValidator),
      this.findManyByCity.bind(this)
    );
  }

  async findManyByCity(
    req: Request<{ city: string }>,
    res: Response,
    next: NextFunction
  ) {
    const city = req.params.city;

    try {
      const data = await this.service.findManyByCity(city);

      res.json(data);
    } catch (error) {
      next(error);
      if (axios.isAxiosError(error) && error.status) {
        res.status(error.status);

        switch (error.status) {
          case 404:
            res.send(ApiError.CityNotFound);
            break;
          default:
            res.send(ApiError.Unknown);
        }
      }

      res.status(500).send();
    }
  }
}
