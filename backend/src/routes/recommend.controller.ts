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
    /**
     * @swagger
     * /recommend/{city}:
     *   get:
     *     summary: Get recommendations by city weather
     *     description: Retrieve recommendations based on the specified city's weather.
     *     parameters:
     *       - in: path
     *         name: city
     *         required: true
     *         description: The city for which weather dependent movie recommendations are requested.
     *         schema:
     *           type: string
     *           minLength: 2
     *           maxLength: 32
     *     responses:
     *       200:
     *         description: A list of movie recommendations based the specified city's weather.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                     description: The recommendation ID.
     *                   name:
     *                     type: string
     *                     description: The name of the recommendation.
     *       400:
     *         description: Invalid input provided (e.g., city length is not between 2 and 32 characters).
     *       500:
     *         description: Internal server error.
     */
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
