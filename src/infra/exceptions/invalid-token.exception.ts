import { BaseException, Status } from '@domain/exceptions';

export class InvalidTokenException extends BaseException {
  readonly code = Status.UNAUTHORIZED;
  constructor(metadata?: unknown) {
    super('Invalid token', metadata);
  }
}
