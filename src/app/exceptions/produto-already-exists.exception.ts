import { BaseException, Status } from '@domain/exceptions';

export class ProdutoAlreadyExistsException extends BaseException {
  readonly code = Status.INVALID_REQUEST;
  constructor(readonly metadata?: unknown) {
    super('Produto ja existe', metadata);
  }
}
