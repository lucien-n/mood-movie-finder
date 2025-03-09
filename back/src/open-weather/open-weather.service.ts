import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  ApiErrorCode,
  WeatherCondition,
  isWeatherCondition,
  type OWWeatherResponse,
} from 'common';
import { firstValueFrom } from 'rxjs';
import { ApiError } from 'src/errors/api-error';
import { getEnvVariable } from 'src/helpers/env';

@Injectable()
export class OpenWeatherService {
  private readonly API_KEY: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.API_KEY = getEnvVariable('OPENWEATHER_API_KEY');
  }

  async findWeatherConditionByCity(city: string): Promise<WeatherCondition> {
    try {
      const cacheKey = `weather.${city}`;
      const cachedWeatherCondition =
        await this.cacheManager.get<WeatherCondition>(cacheKey);
      if (
        cachedWeatherCondition &&
        isWeatherCondition(cachedWeatherCondition)
      ) {
        return cachedWeatherCondition;
      }

      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const params = {
        appid: this.API_KEY,
        q: city,
        units: 'metric',
      };

      const { data } = await firstValueFrom(
        this.httpService.get<OWWeatherResponse>(url, {
          params,
        }),
      );

      const weatherCondition = data.weather
        .flatMap(({ description }) =>
          isWeatherCondition(description) ? description : [],
        )
        .pop();

      if (!weatherCondition) {
        throw new Error(ApiErrorCode.WEATHER_NOT_FOUND);
      }

      this.cacheManager.set(cacheKey, weatherCondition, 1000 * 60 * 15);

      return weatherCondition;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.status) {
          case 400:
          case 401:
            throw new HttpException(
              'Error on Open Weather API call',
              err.status,
              { cause: err },
            );
          case 404:
            throw new ApiError(ApiErrorCode.CITY_NOT_FOUND, err);
          case 429:
            throw new ApiError(ApiErrorCode.TOO_MANY_REQUESTS, err);
        }
      }

      throw new ApiError(ApiErrorCode.INTERNAL_ERROR, err);
    }
  }
}
