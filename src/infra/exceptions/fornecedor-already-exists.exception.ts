import { BaseException, Status } from '@domain/exceptions';

export class FornecedorAlreadyExistsException extends BaseException {
  readonly code = Status.INVALID_REQUEST;
  constructor(readonly metadata?: unknown) {
    super('Fornecedor ja cadastrado', metadata);
  }
}
