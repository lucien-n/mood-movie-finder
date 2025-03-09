import { ApiErrorCode } from 'common';

export class ApiError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    public readonly error?: Error,
  ) {
    super(code);
  }
}
