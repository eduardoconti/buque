import { BaseException, Status } from '@domain/exceptions';

export class PedidoRepositoryException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
