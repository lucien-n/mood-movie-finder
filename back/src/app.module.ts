import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherModule } from './open-weather/open-weather.module';
import { OpenWeatherService } from './open-weather/open-weather.service';
import { RecommendModule } from './recommend/recommend.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { TmdbService } from './tmdb/tmdb.service';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
    HttpModule.register({ global: true }),
    TmdbModule,
    OpenWeatherModule,
    RecommendModule,
  ],
  controllers: [],
  providers: [TmdbService, OpenWeatherService],
})
export class AppModule {}
