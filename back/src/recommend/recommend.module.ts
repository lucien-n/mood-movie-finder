import { Module } from '@nestjs/common';
import { OpenWeatherModule } from 'src/open-weather/open-weather.module';
import { TmdbModule } from 'src/tmdb/tmdb.module';
import { RecommendController } from './recommend.controller';
import { RecommendService } from './recommend.service';

@Module({
  imports: [TmdbModule, OpenWeatherModule],
  controllers: [RecommendController],
  providers: [RecommendService],
})
export class RecommendModule {}
