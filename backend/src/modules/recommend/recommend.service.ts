import { TMDBService } from "../tmdb/tmdb.service";

export class RecommendService {
  constructor(private readonly tmdbService: TMDBService) {}
}
