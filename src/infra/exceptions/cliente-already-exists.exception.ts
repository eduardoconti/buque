import { BaseException, Status } from '@domain/exceptions';

export class ClienteAlreadyExistsException extends BaseException {
  readonly code = Status.INVALID_REQUEST;
  constructor(readonly metadata?: unknown) {
    super('Cliente ja cadastrado', metadata);
  }
}
