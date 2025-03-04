import { Module } from "@/core/module";
import { TMDBController } from "./tmdb.controller";
import { TMDBService } from "./tmdb.service";

export class TMDBModule extends Module {
  provides = [TMDBController];
  exports = [TMDBService];
}
