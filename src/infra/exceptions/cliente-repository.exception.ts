import { BaseException, Status } from '@domain/exceptions';

export class ClienteRepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
