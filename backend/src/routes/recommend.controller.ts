import { RecommendService } from "@/services/recommend.service";
import { TMDBService } from "@/services/tmdb.service";
import { WeatherService } from "@/services/weather.service";
import { validate } from "@/validate";
import axios from "axios";
import { Router, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import cityParamValidator from "./validators/city-param";

export class RecommendController {
  public router = Router();
  private service = new RecommendService(
    new TMDBService(),
    new WeatherService()
  );
  private limiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    limit: 6,
  });

  constructor() {
    this.router.use(this.limiter);

    this.router.get(
      `/recommend/:city`,
      validate(cityParamValidator),
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
