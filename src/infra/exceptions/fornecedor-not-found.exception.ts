import { BaseException, Status } from '@domain/exceptions';

export class FornecedorNotFoundException extends BaseException {
  readonly code = Status.INTERNAL_ERROR;
}
