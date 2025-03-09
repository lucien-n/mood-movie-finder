import { Controller, Get, Param } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { RecommendService } from './recommend.service';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Throttle({ default: { limit: 7, ttl: 1000 * 10 } })
  @Get('/:city')
  findManyByCity(@Param('city') city: string) {
    return this.recommendService.findManyByCity(city);
  }
}
