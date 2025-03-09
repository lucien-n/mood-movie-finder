import { Controller, Get, Param } from '@nestjs/common';
import { ApiErrorCode } from 'common';
import { RecommendService } from './recommend.service';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Get('/:city')
  findManyByCity(@Param('city') city: string) {
    return this.recommendService.findManyByCity(city);
  }
}
