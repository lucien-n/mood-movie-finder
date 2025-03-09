import { ApiErrorCode } from 'common';

export class AppException extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    public readonly details?: Record<string, unknown>,
  ) {
    super(code);
  }
}
