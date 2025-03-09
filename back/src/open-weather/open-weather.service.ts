import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import {
  ApiErrorCode,
  isWeatherCondition,
  type OWWeatherResponse,
  WeatherCondition,
} from 'common';
import { ApiError } from 'src/errors/api-error';
import { getEnvVariable } from 'src/helpers/env';

@Injectable()
export class OpenWeatherService {
  private readonly API_KEY: string;

  constructor() {
    this.API_KEY = getEnvVariable('OPENWEATHER_API_KEY');
  }

  async findWeatherConditionByCity(city: string): Promise<WeatherCondition> {
    try {
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const params = {
        appid: this.API_KEY,
        q: city,
        units: 'metric',
      };

      const response = await axios.get<OWWeatherResponse>(url, { params });

      const weatherCondition = response.data.weather
        .flatMap(({ description }) =>
          isWeatherCondition(description) ? description : [],
        )
        .pop();

      if (!weatherCondition) {
        throw new Error(ApiErrorCode.WEATHER_NOT_FOUND);
      }

      return weatherCondition;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.status) {
          case 400:
            throw new ApiError(ApiErrorCode.INVALID_REQUEST, err);
          case 401:
            throw new ApiError(ApiErrorCode.UNAUTHORIZED, err);
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
