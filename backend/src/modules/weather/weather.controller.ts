import { Router, type Request, type Response } from "express";
import { WeatherService } from "./weather.service";
import { Controller } from "@/core/controller";

export class WeatherController extends Controller {
  public router = Router();
  private service = new WeatherService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/weather/:city`, this.findOne.bind(this));
  }

  async findOne(req: Request<{ city: string }>, res: Response) {
    const city = req.params.city;

    try {
      const data = await this.service.findWeatherByCity(city);

      res.json(data);
    } catch (error) {
      console.error(`Error while getting weather by city "${city}":`, error);

      res.status(500).send();
    }
  }
}
