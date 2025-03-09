import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import {
  ApiErrorCode,
  isWeatherCondition,
  type OWWeatherResponse,
  WeatherCondition,
} from 'common';
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
        throw new Error(ApiErrorCode.WeatherNotFound);
      }

      return weatherCondition;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const errorData = err.response?.data;

        switch (status) {
          case 400:
            throw new BadRequestException({
              cause: err,
              message: 'Invalid request parameters',
              description: errorData?.parameters
                ? `Invalid/missing: ${errorData.parameters.join(', ')}`
                : 'Check request parameters',
            });

          case 401:
            throw new UnauthorizedException({
              cause: err,
              description: 'Invalid or missing API token',
            });

          case 404:
            throw new NotFoundException({
              cause: err,
              description: 'City not found in OpenWeather database',
            });

          case 429:
            throw new HttpException(
              'API request quota exceeded',
              HttpStatus.TOO_MANY_REQUESTS,
              { cause: err },
            );

          default:
            if (status && status >= 500) {
              throw new InternalServerErrorException({
                cause: err,
                description: 'OpenWeather API internal error. Contact support.',
              });
            }

            throw new HttpException(
              'Unexpected API error',
              status || HttpStatus.INTERNAL_SERVER_ERROR,
              { cause: err },
            );
        }
      } else {
        // Handle non-Axios errors (network issues, etc.)
        throw new InternalServerErrorException({
          cause: err,
          description: 'Failed to communicate with OpenWeather API',
        });
      }
    }
  }
}
