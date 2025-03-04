import { Router, type Request, type Response } from "express";
import { WeatherService } from "./weather.service";

export class WeatherController {
  public router = Router();
  private service = new WeatherService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/weather/:city`, this.findOne);
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
