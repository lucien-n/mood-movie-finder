import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ApiErrorCode } from 'common';
import { ApiError } from 'src/errors/api-error';
import { response, Response } from 'express';

const API_ERROR_TO_HTTP_CODE_MAPPING = {
  [ApiErrorCode.INVALID_REQUEST]: HttpStatus.BAD_REQUEST,
  [ApiErrorCode.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
  [ApiErrorCode.CITY_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ApiErrorCode.WEATHER_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ApiErrorCode.TOO_MANY_REQUESTS]: HttpStatus.TOO_MANY_REQUESTS,
  [ApiErrorCode.INTERNAL_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
};

@Catch()
export class GlobalErrorFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ApiError) {
      console.error({
        code: exception.code,
        stack: exception.stack,
        error: exception.error,
      });

      response
        .status(this.getApiErrorStatusCode(exception.code))
        .json(exception.code);
    } else {
      console.error('Untreated exception caught:', exception);

      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(ApiErrorCode.INTERNAL_ERROR);
    }
  }

  private getApiErrorStatusCode(code: ApiErrorCode): HttpStatus {
    return API_ERROR_TO_HTTP_CODE_MAPPING[code];
  }
}
