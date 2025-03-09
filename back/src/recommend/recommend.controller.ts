import { Controller, Get, Param } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { ApiError } from 'common';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Get('/:city')
  findManyByCity(@Param('city') city: string) {
    try {
      return this.recommendService.findManyByCity(city);
    } catch (err) {
      throw new Error(ApiError.Unknown);
    }
  }
}
