import { Module } from "@/core/module";
import { WeatherController } from "./weather.controller";
import { WeatherService } from "./weather.service";

export class WeatherModule extends Module {
  provides = [WeatherController];
  exports = [WeatherService];
}
