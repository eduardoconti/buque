import { BaseException, Status } from '@domain/exceptions';

export class ProdutoNotFoundException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
