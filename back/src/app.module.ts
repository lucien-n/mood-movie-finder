import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherModule } from './open-weather/open-weather.module';
import { OpenWeatherService } from './open-weather/open-weather.service';
import { RecommendModule } from './recommend/recommend.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { TmdbService } from './tmdb/tmdb.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TmdbModule,
    OpenWeatherModule,
    RecommendModule,
  ],
  controllers: [],
  providers: [TmdbService, OpenWeatherService],
})
export class AppModule {}
