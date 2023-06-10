import { BaseException, Status } from '@domain/exceptions';

export class CompraRepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
