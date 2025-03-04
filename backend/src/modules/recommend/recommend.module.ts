import { Module } from "@/core/module";
import { TMDBService } from "../tmdb/tmdb.service";
import { WeatherService } from "../weather/weather.service";

export class RecommendModule extends Module {
  imports = [TMDBService, WeatherService];
}
