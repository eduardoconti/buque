import { BaseException, Status } from '@domain/exceptions';

export class FornecedorRepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
