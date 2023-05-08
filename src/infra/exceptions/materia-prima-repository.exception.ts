import { BaseException, Status } from '@domain/exceptions';

export class MateriaPrimaRepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
