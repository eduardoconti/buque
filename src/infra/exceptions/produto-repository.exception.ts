import { BaseException, Status } from '@domain/exceptions';

export class ProdutoRepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
